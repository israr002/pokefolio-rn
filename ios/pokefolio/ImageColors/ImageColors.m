#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ImageColors, NSObject)

RCT_EXTERN_METHOD(getColors:(NSString *)uri
                  fallback:(NSString *)fallback
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end 