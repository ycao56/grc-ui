/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {POLICY_REFRESH_INTERVAL_COOKIE} from '../../lib/shared/constants'
import {getPollInterval} from '../components/common/RefreshTimeSelect'
import Page from '../components/common/Page'
import GrcView from '../components/GrcView'
import {updateSecondaryHeader} from '../actions/common'
import { FindingList } from '../../lib/client/queries'
import msgs from '../../nls/platform.properties'
import _ from 'lodash'

class FindingsTab extends React.Component {

  static propTypes = {
    secondaryHeaderProps: PropTypes.object,
    updateSecondaryHeader: PropTypes.func,
  }

  constructor (props) {
    super(props)
    this.firstLoad = true
  }

  componentWillMount() {
    const { updateSecondaryHeader, secondaryHeaderProps } = this.props
    const { title, tabs, links, information } = secondaryHeaderProps
    updateSecondaryHeader(msgs.get(title, this.context.locale), tabs, links, msgs.get(information, this.context.locale))
  }

  render () {
    const { secondaryHeaderProps } = this.props
    const pollInterval = getPollInterval(POLICY_REFRESH_INTERVAL_COOKIE)
    return (
      <Page>
        <Query query={FindingList} pollInterval={pollInterval} notifyOnNetworkStatusChange >
          {( result ) => {
            const {data={}, loading, startPolling, stopPolling, refetch} = result
            const { findings } = data
            const error = findings ? null : result.error
            const firstLoad = this.firstLoad
            this.firstLoad = false
            const reloading = !firstLoad && loading
            if (!reloading) {
              this.timestamp = new Date().toString()
            }
            const refreshControl = {
              reloading,
              refreshCookie: POLICY_REFRESH_INTERVAL_COOKIE,
              startPolling, stopPolling, refetch,
              timestamp: this.timestamp
            }

            return (
              <div>
                <GrcView
                  loading={!findings && loading}
                  error={error}
                  grcItems={this.formatEmptySecurityClassification(findings)}
                  refreshControl={refreshControl}
                  secondaryHeaderProps={secondaryHeaderProps}
                />
              </div>
            )
          }
          }
        </Query>
      </Page>
    )
  }

  formatEmptySecurityClassification(findings) {
    if(findings){
      findings.forEach((finding) => {
        if(!_.get(finding, 'securityClassification', null)) {
          return finding['securityClassification'] = {
            'securityStandards': [''],
            'securityCategories': [''],
            'securityControl': ''
          }
        }
      })
    }
    return findings
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSecondaryHeader: (title, tabs, links, information) => dispatch(updateSecondaryHeader(title, tabs, undefined, links, '', information)),
  }
}

export default withRouter(connect(null, mapDispatchToProps)(FindingsTab))
