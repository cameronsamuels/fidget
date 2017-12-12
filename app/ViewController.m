// ViewController.m
// Fidget Spinner
// Created by CameronSamuels on 4/19/17.
// Copyright © 2017 Cameron Samuels. All rights reserved.
#import "ViewController.h"
@interface ViewController ()
@end
@implementation ViewController
- (void)viewDidLoad {
    if ([[[NSUserDefaults standardUserDefaults] objectForKey:@"beta"] boolValue]) [page loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:@"https://fidget.cameronsamuels.com"]]];
    else {
        NSString *indexPath = [[NSBundle mainBundle] pathForResource:@"ios" ofType:@"html"];
        [page loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:indexPath]]];
    }
    page.scrollView.bounces = NO;   
    [super viewDidLoad];
}
- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}
@end
