import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

void main() => runApp(
      WebViewApp(),
    );

class WebViewApp extends StatelessWidget {
  late WebViewController _controller;
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Helpify',
      home: Scaffold(
        extendBodyBehindAppBar: false,
        appBar: AppBar(
          backgroundColor: Colors.transparent,
          elevation: 0,
          title: Text(''),
        ),
        body: Center(
          child: WebView(
            initialUrl: 'https://black-hill-6592.on.fleek.co/',
            javascriptMode: JavascriptMode.unrestricted,
            onWebViewCreated: (WebViewController webcontroller) {
              _controller = webcontroller;
            },
          ),
        ),
      ),
    );
  }
}
