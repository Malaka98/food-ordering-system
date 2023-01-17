# **Full Stack Project Backend**

### This web service has been developed using Express

Also, the "Inversion Of Control" principle, which is a very useful design principle, has been used here.

**This is a response from ChatGPT**

Inversion of Control (IoC) is a design principle that allows a component to receive its dependencies, rather than
creating them itself. This separates the concerns of creating and managing dependencies from the component that uses
them, and allows for greater flexibility and testability.

There are two main types of IoC:

    Dependency Injection (DI): This is the process of providing an object with its dependencies. 
                               The object doesn't create or look up its dependencies, but instead they are passed to it.

    Service Locator: An object that "locates" or retrieves other objects, 
                     often used to decouple a class from the process of creating its dependencies.

Inversify is a popular library for implementing IoC in JavaScript and TypeScript projects, it uses a modular approach to
build a lightweight and powerful inversion of control container for JavaScript & Node.js applications.

Inversion of control is often used in software development to increase flexibility and testability of the code. By using
IoC, it is possible to change the behavior of a component by replacing its dependencies without modifying the component
itself. This makes it easier to test components in isolation and to change the implementation of a component without
affecting the rest of the system.

**The inversify library has been used to implement an IOC container on a node express server**
