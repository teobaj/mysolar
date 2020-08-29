import 'package:flutter/material.dart';

class LoginScreen extends StatefulWidget {
  @override
  LoginScreenState createState() => LoginScreenState();
}

class LoginScreenState extends State<LoginScreen> {
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: Container(
        width: double.infinity,
        decoration: BoxDecoration(
            color: const Color(0xff009ff5),
            gradient: LinearGradient(colors: [
              Color(0xff7F7FD5),
              Color(0xff86A8E7),
              Color(0xff009ff5)
            ], begin: Alignment.topLeft, end: Alignment.bottomRight)),
        child: Column(
          children: [
            Container(
                margin: EdgeInsets.only(top: 20),
                child: Row(
                  children: [
                    IconButton(
                      icon: Icon(Icons.arrow_back_ios),
                      onPressed: () {
                        Navigator.pop(context);
                      },
                    ),
                    Text("Back")
                  ],
                )),
            Container(
              margin: EdgeInsets.only(top: 50),
              height: size.height * 0.2,
              child: Text("Login"),
            ),
            TextField(
              decoration: InputDecoration(),
            )
          ],
        ),
      ),
    );
  }
}
