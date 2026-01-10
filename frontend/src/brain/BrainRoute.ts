import { CheckHealthData, SubscribeRequest, SubscribeUserData } from "./data-contracts";

export namespace Brain {
  /**
   * @description Check health of application. Returns 200 when OK, 500 when not.
   * @name check_health
   * @summary Check Health
   * @request GET:/_healthz
   */
  export namespace check_health {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CheckHealthData;
  }

  /**
   * @description Subscribes a user to the newsletter via Campaign Monitor.
   * @tags dbtn/module:subscribe
   * @name subscribe_user
   * @summary Subscribe User
   * @request POST:/routes/subscribe
   */
  export namespace subscribe_user {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SubscribeRequest;
    export type RequestHeaders = {};
    export type ResponseBody = SubscribeUserData;
  }
}
