/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
import {
  ROLE_RECEIVE_SUCCESS,
  ROLE_RECEIVE_FAILURE,
  REQUEST_STATUS
} from '../actions'

export const role = (state = null, action) => {
  if (action) {
    switch (action.type) {
    case ROLE_RECEIVE_SUCCESS:
      return { ...action, status: REQUEST_STATUS.DONE }
    case ROLE_RECEIVE_FAILURE:
      return { ...state,
        status: REQUEST_STATUS.ERROR,
        errorMessage: action.err && action.err.details,
        statusCode: action.err && action.err.statusCode }
    default:
      return state
    }
  }
  return undefined
}