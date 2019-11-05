/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
'use strict'

import React from 'react'
import {ResourceTableModule} from '../../../../src-web/components/common/ResourceTableModuleFromProps'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import * as reducers from '../../../../src-web/reducers'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import apolloClient from '../../../../lib/client/apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { resourceType, staticResourceData } from './CommonTestingData'

describe('ResourceTableModuleFromProps component test', () => {
  it('renders as expected', () => {
    const fn = jest.fn()
    const preloadedState = window.__PRELOADED_STATE__
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const middleware = [thunkMiddleware]
    const store = createStore(combineReducers(reducers), preloadedState, composeEnhancers(
      applyMiddleware(...middleware)
    ))
    const component = renderer.create(
      <ApolloProvider client={apolloClient.getClient()}>
        <Provider store={store}>
          <BrowserRouter>
            <ResourceTableModule
              staticResourceData={staticResourceData}
              definitionsKey={'policyViolatedSidePanel'}
              sortDirection={'asc'}
              fetchResources={fn}
              resourceType={resourceType}
              normalizedKey={'key'}
            />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})