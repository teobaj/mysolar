import 'package:flutter/material.dart';
import 'package:mysolar_flutter/components/welcomeScreen.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  MyAppState createState() => MyAppState();
}

class MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: WelcomeScreen(), theme: ThemeData(), title: "My Solar");
  }
}
