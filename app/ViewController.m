// Created by CameronSamuels on 4/19/17.
// Copyright © 2017 Cameron Samuels. All rights reserved.
#import "ViewController.h"
@interface ViewController ()
@end
@implementation ViewController
- (void)viewDidLoad {
    [page loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:[[NSBundle mainBundle] pathForResource:@"ios" ofType:@"html"]]]];
    page.scrollView.bounces = NO;   
    [super viewDidLoad];
}
- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}
@end
