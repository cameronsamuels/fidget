//  Created by CameronSamuels on 4/20/17.
//  Copyright © 2017 Cameron Samuels. All rights reserved.
#import "TodayViewController.h"
#import <NotificationCenter/NotificationCenter.h>
@interface TodayViewController () <NCWidgetProviding>
@end
@implementation TodayViewController
- (void)viewDidLoad {
    NSString *indexPath = [[NSBundle mainBundle] pathForResource:@"ios-widget" ofType:@"html"];
    [page loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:indexPath]]];
    page.scrollView.bounces = NO;
    [super viewDidLoad];
    self.extensionContext.widgetLargestAvailableDisplayMode = NCWidgetDisplayModeExpanded;
    self.preferredContentSize = CGSizeMake(0, 320.0);
}
- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}
- (void)widgetActiveDisplayModeDidChange:(NCWidgetDisplayMode)activeDisplayMode withMaximumSize:(CGSize)maxSize {
    if (activeDisplayMode == NCWidgetDisplayModeExpanded) self.preferredContentSize = CGSizeMake(0.0, 320.0);
    else self.preferredContentSize = maxSize;
}
- (void)widgetPerformUpdateWithCompletionHandler:(void (^)(NCUpdateResult))completionHandler {
    completionHandler(NCUpdateResultNoData);
}
@end
