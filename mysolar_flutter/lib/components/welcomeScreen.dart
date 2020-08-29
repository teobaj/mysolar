import 'package:flutter/material.dart';
import 'package:mysolar_flutter/components/loginScreen.dart';

class WelcomeScreen extends StatelessWidget {
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
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              margin: EdgeInsets.only(bottom: 100),
              child: Text(
                "Welcome to solar app monitoring",
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),
              ),
            ),
            Container(
              margin: EdgeInsets.only(top: 30, bottom: 30),
              width: size.width * 0.8,
              child: ClipRRect(
                borderRadius: BorderRadius.circular(29),
                child: FlatButton(
                  onPressed: () {
                    Navigator.push(context,
                        MaterialPageRoute(builder: (context) => LoginScreen()));
                  },
                  child: Text(
                    "Login",
                    style: TextStyle(color: Colors.white),
                  ),
                  color: Colors.blue[700],
                  padding: EdgeInsets.symmetric(vertical: 20, horizontal: 40),
                ),
              ),
            ),
            Container(
              margin: EdgeInsets.only(bottom: 30),
              width: size.width * 0.8,
              child: ClipRRect(
                borderRadius: BorderRadius.circular(29),
                child: FlatButton(
                  onPressed: () {},
                  child: Text(
                    "Sign Up",
                    style: TextStyle(color: Colors.white),
                  ),
                  color: Colors.blue[700],
                  padding: EdgeInsets.symmetric(vertical: 20, horizontal: 40),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
