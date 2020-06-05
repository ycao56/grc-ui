/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
'use strict'
import _ from 'lodash'

const formatPolicyClusterView = (clusterName, policiesUnderCluster) => {
  let validNum = 0
  let nameSpace = '-'
  let consoleURL = '-'
  const nonCompliant = []
  policiesUnderCluster.forEach(policy => {
    if (policy.clusterNS && typeof policy.clusterNS === 'object' && policy.clusterNS[clusterName]) {
      nameSpace = policy.clusterNS[clusterName]
    }

    if (policy.clusterConsoleURL && typeof policy.clusterConsoleURL === 'object' && policy.clusterConsoleURL[clusterName]) {
      consoleURL = policy.clusterConsoleURL[clusterName]
    }

    const statuses = _.get(policy, 'raw.status.status')
    if (Array.isArray(statuses) && statuses.length > 0) {
      statuses.forEach(status => {
        const clusterNameTemp = _.get(status, 'clustername', '')
        const compliantTemp = _.get(status, 'compliant', '')
        if (clusterNameTemp.trim().toLowerCase() === clusterName.trim().toLowerCase()) {
          if (compliantTemp.trim().toLowerCase() === 'compliant') {
            validNum += 1
          } else {
            nonCompliant.push(_.get(policy, 'metadata.name', '-'))
          }
        }
      })
    }
  })

  return {
    cluster: clusterName,
    namespace: nameSpace,
    violation: `${policiesUnderCluster.length-validNum}/${policiesUnderCluster.length}`,
    nonCompliant: nonCompliant,
    consoleURL: consoleURL,
  }
}

export const formatPoliciesToClustersTableData = (policies) => {
  const result = []
  const map = new Map()
  if (policies) {
    policies.forEach((policy) => {
      const statuses = _.get(policy, 'raw.status.status', {})
      Array.isArray(statuses) && statuses.forEach((cluster) =>
      {
        if (!map.has(cluster.clustername)) {
          map.set(cluster.clustername, [])
        }
        map.get(cluster.clustername).push(policy)
      })
    })

    for (const [key, value] of map.entries()) {
      result.push(formatPolicyClusterView(key, value))
    }
  }
  return result
}

const formatFindingClusterView = (clusterName, findingsUnderCluster) => {
  let validNum = 0
  // let nameSpace
  const highSeverity = {}
  findingsUnderCluster.forEach(finding => {
    // nameSpace = _.get(finding, 'context.namespaceName', '-')
    const status = _.get(finding, 'finding.severity', '')
    const isHigh = status.toUpperCase() === 'HIGH' ? true : false
    if (isHigh) {
      const description = _.get(finding, 'shortDescription', '-')
      highSeverity[description] = highSeverity[description] ? highSeverity[description]+1 : 1
    } else {
      validNum += 1
    }
  })
  return {
    cluster: clusterName,
    // namespace: nameSpace,
    severity: `${findingsUnderCluster.length-validNum}/${findingsUnderCluster.length}`,
    highSeverity: highSeverity,
    findingsUnderCluster: findingsUnderCluster,
  }
}

export const formatFindingsToClustersTableData = (findings) => {
  const result = []
  const map = new Map()
  if (findings) {
    findings.forEach((finding) => {
      const cluster = _.get(finding, 'context.clusterName', '-')
      if (!map.has(cluster)) {
        map.set(cluster, [])
      }
      map.get(cluster).push(finding)
    })
    for (const [key, value] of map.entries()) {
      result.push(formatFindingClusterView(key, value))
    }
  }
  return result
}

export const formatExpandablePolicies = (policies) => {
  const result = []
  if (policies) {
    policies.forEach(policy => {
      if(policy) {
        const subItems = [{name: 'policy.pb', items: policy.placementBindings ? policy.placementBindings.map(pb => pb.metadata.name) : []},
          {name: 'policy.pp', items: policy.placementPolicies ? policy.placementPolicies.map(pp => pp.metadata.name) : []}]
        result.push({...policy, subItems})
      }
    })
  }
  return result
}

export const formatApplicationTableData = (applications) => {
  const resultMap = {}
  if (applications && Array.isArray(applications)) {
    applications.forEach(application => {
      const name = _.get(application, 'name', 'unknown')
      const nameSpace = _.get(application, 'namespace', 'unknown')
      let result = resultMap[name]
      if (!result) {
        resultMap[name] = result = {
          name,
          nameSpace,
          violations: 0,
          violatedPolicies: [],
        }
      }
      const violatedPolicies = application.policies
      if (violatedPolicies) {
        violatedPolicies.map(violatedPolicy=>{
          if (violatedPolicy.name) {
            result.violatedPolicies.push({name: violatedPolicy.name, namespace: violatedPolicy.namespace, clusters: violatedPolicy.clusters})
            result.violations++
          }
        })
      }
    })
  }

  //convert result object to array for definition
  const resultArray = []
  Object.entries(resultMap).forEach(result => {
    if (result[1]) {
      resultArray.push(result[1])
    }
  })

  return Array.from(resultArray)
}
