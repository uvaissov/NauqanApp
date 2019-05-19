#!/usr/bin/env python3

from pyfcm import FCMNotification
 
push_service = FCMNotification(api_key="AAAAphabiYU:APA91bFWmNmxyW4qBpCO-qNnOGR_aNEwee_OFYQaWbZAd3yuGYFBJ29iuBYTdlrbHf2ZKD--rgXekdwXAjtiphM6W7snz4LObJvzlEz2_Y-tRDymCQn1QDoP_b0wvTPSZr_a3xHi6SwI")
print('Hello')
# OR initialize with proxies
 
proxy_dict = {
          "http"  : "http://127.0.0.1",
          "https" : "http://127.0.0.1",
        }
push_service = FCMNotification(api_key="<api-key>", proxy_dict=proxy_dict)
 
# Your api-key can be gotten from:  https://console.firebase.google.com/project/<project-name>/settings/cloudmessaging
 
registration_id = "cVBDOp_qTq8:APA91bEKVaddxhP3Uv68FCbt3E7eOdcWWzv2dY6PNH51M7eEAxDnwzzUsesWOa_qbHh9fvtnRU8ECzCxVpLT5aZ5YUifq2ITZMf4D7DBsK4AzyMVGaDl5JXNZ3HakTAQIH5yBr4XEtIY"
message_title = "Uber update"
message_body = "Hi john, your customized news for today is ready"
result = push_service.notify_single_device(registration_id=registration_id, message_title=message_title, message_body=message_body)
 
print result
 
# Send to multiple devices by passing a list of ids.
registration_ids = ["<device registration_id 1>", "<device registration_id 2>", ...]
message_title = "Uber update"
message_body = "Hope you're having fun this weekend, don't forget to check today's news"
result = push_service.notify_multiple_devices(registration_ids=registration_ids, message_title=message_title, message_body=message_body)
 
print result

from pyfcm import FCMNotification
push_service = FCMNotification(api_key="AAAAphabiYU:APA91bFWmNmxyW4qBpCO-qNnOGR_aNEwee_OFYQaWbZAd3yuGYFBJ29iuBYTdlrbHf2ZKD--rgXekdwXAjtiphM6W7snz4LObJvzlEz2_Y-tRDymCQn1QDoP_b0wvTPSZr_a3xHi6SwI")
registration_id = "cVBDOp_qTq8:APA91bEKVaddxhP3Uv68FCbt3E7eOdcWWzv2dY6PNH51M7eEAxDnwzzUsesWOa_qbHh9fvtnRU8ECzCxVpLT5aZ5YUifq2ITZMf4D7DBsK4AzyMVGaDl5JXNZ3HakTAQIH5yBr4XEtIY"
message_title = "Uber update"
message_body = "Hi john, your customized news for today is ready"
result = push_service.notify_single_device(registration_id=registration_id, message_title=message_title, message_body=message_body)
print result