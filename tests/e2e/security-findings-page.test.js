/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

const config = require('../../config')
const a11yScan = require('../utils/accessibilityScan')
let page

module.exports = {
  '@disabled': false,

  before: (browser) => {
    const loginPage = browser.page.LoginPage()
    loginPage.navigate()
    loginPage.authenticate()

    const url = `${browser.launch_url}${config.get('contextPath')}/policies/findings`
    page = browser.page.SecurityFindingsPage()
    page.navigate(url)
  },

  'Security findings page: Load and run expand': (browser) => {
    page.verifyTable(browser)
  },

  'Security findings page: Verify summary table': (browser) => {
    page.verifySummary(browser, `${browser.launch_url}${config.get('contextPath')}/policies/findings`)
    page.searchFindings(true, 'policy-role')
  },

  'Security findings page: Test pagination': (browser) => {
    page.verifyPagination(browser)
  },

  'Security findings page: Run Accessibility Scan': (browser) => {
    page.navigate(`${browser.launch_url}${config.get('contextPath')}/policies/findings`)
    a11yScan.runAccessibilityScan(browser, 'allPolicy')
  },

  after: function (browser, done) {
    setTimeout(() => {
      browser.end()
      done()
    })
  }
}