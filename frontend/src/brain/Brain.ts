import { CheckHealthData, SubscribeRequest, SubscribeUserData, SubscribeUserError } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Brain<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Check health of application. Returns 200 when OK, 500 when not.
   *
   * @name check_health
   * @summary Check Health
   * @request GET:/_healthz
   */
  check_health = (params: RequestParams = {}) =>
    this.request<CheckHealthData, any>({
      path: `/_healthz`,
      method: "GET",
      ...params,
    });

  /**
   * @description Subscribes a user to the newsletter via Campaign Monitor.
   *
   * @tags dbtn/module:subscribe
   * @name subscribe_user
   * @summary Subscribe User
   * @request POST:/routes/subscribe
   */
  subscribe_user = (data: SubscribeRequest, params: RequestParams = {}) =>
    this.request<SubscribeUserData, SubscribeUserError>({
      path: `/routes/subscribe`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
