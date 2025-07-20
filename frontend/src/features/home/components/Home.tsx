export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <span>Home</span>
    </div>
  );
}

// import { Header } from "./Header";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   ShoppingCart,
//   Truck,
//   Shield,
//   Clock,
//   MapPin,
//   CheckCircle,
//   Users,
//   BarChart3,
//   Package,
//   Zap,
//   ArrowRight,
// } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       {/* Header */}
//       <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
//               <Zap className="w-5 h-5 text-white" />
//             </div>
//             <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               QuickCommerce
//             </span>
//           </div>
//           <nav className="hidden md:flex items-center space-x-6">
//             <Link
//               to="#features"
//               className="text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               Features
//             </Link>
//             <Link
//               to="#how-it-works"
//               className="text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               How it Works
//             </Link>
//             <Link
//               to="#contact"
//               className="text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               Contact
//             </Link>
//           </nav>
//           <div className="flex items-center space-x-3">
//             <Button variant="ghost">Sign In</Button>
//             <Button>Get Started</Button>
//           </div>
//         </div>
//       </header>

//       <Header
//         isAuthenticated={false}
//         onSignOut={() => {}}
//         user={{ name: "admin" }}
//         role={"partner"}
//       />

//       {/* Hero Section */}
//       <section className="py-20 px-4">
//         <div className="container mx-auto text-center max-w-4xl">
//           <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
//             🚀 Lightning Fast Delivery Platform
//           </Badge>
//           <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
//             Quick Commerce Made Simple
//           </h1>
//           <p className="text-xl text-gray-600 mb-8 leading-relaxed">
//             Complete delivery management platform connecting customers, delivery
//             partners, and administrators in one seamless ecosystem. Order,
//             deliver, and manage with real-time tracking.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button
//               size="lg"
//               className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//             >
//               Start Ordering <ArrowRight className="ml-2 w-4 h-4" />
//             </Button>
//             <Button size="lg" variant="outline">
//               Join as Partner
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* User Panels Section */}
//       <section id="features" className="py-20 px-4 bg-white">
//         <div className="container mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">
//               Three Powerful Panels
//             </h2>
//             <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//               Designed for every stakeholder in the quick commerce ecosystem
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {/* Customer Panel */}
//             <Card className="relative overflow-hidden border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
//               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
//               <CardHeader className="text-center pb-4">
//                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <ShoppingCart className="w-8 h-8 text-blue-600" />
//                 </div>
//                 <CardTitle className="text-2xl text-blue-600">
//                   Customer Panel
//                 </CardTitle>
//                 <CardDescription>
//                   Shop and track your orders effortlessly
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="flex items-center space-x-3">
//                   <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
//                   <span className="text-sm">Register / Login</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
//                   <span className="text-sm">Browse Product Catalog</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
//                   <span className="text-sm">Place Orders Instantly</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
//                   <span className="text-sm">Live Order Status Tracking</span>
//                 </div>
//                 <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
//                   Start Shopping
//                 </Button>
//               </CardContent>
//             </Card>

//             {/* Delivery Partner Panel */}
//             <Card className="relative overflow-hidden border-2 hover:border-green-200 transition-all duration-300 hover:shadow-lg">
//               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
//               <CardHeader className="text-center pb-4">
//                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Truck className="w-8 h-8 text-green-600" />
//                 </div>
//                 <CardTitle className="text-2xl text-green-600">
//                   Delivery Partner
//                 </CardTitle>
//                 <CardDescription>
//                   Manage deliveries and earn efficiently
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="flex items-center space-x-3">
//                   <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
//                   <span className="text-sm">Register / Login</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
//                   <span className="text-sm">View Unassigned Orders</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
//                   <span className="text-sm">Accept Orders (Lock System)</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
//                   <span className="text-sm">Update Delivery Status</span>
//                 </div>
//                 <Button className="w-full mt-6 bg-green-600 hover:bg-green-700">
//                   Join as Partner
//                 </Button>
//               </CardContent>
//             </Card>

//             {/* Admin Panel */}
//             <Card className="relative overflow-hidden border-2 hover:border-purple-200 transition-all duration-300 hover:shadow-lg">
//               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
//               <CardHeader className="text-center pb-4">
//                 <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Shield className="w-8 h-8 text-purple-600" />
//                 </div>
//                 <CardTitle className="text-2xl text-purple-600">
//                   Admin Panel
//                 </CardTitle>
//                 <CardDescription>
//                   Complete oversight and management
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="flex items-center space-x-3">
//                   <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
//                   <span className="text-sm">View All Orders</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
//                   <span className="text-sm">Manage Delivery Partners</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
//                   <span className="text-sm">Live Status Monitoring</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
//                   <span className="text-sm">Analytics & Reports</span>
//                 </div>
//                 <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">
//                   Admin Access
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section id="how-it-works" className="py-20 px-4 bg-gray-50">
//         <div className="container mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">
//               How It Works
//             </h2>
//             <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//               Simple steps to get started with our quick commerce platform
//             </p>
//           </div>

//           <div className="grid md:grid-cols-4 gap-8">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Package className="w-8 h-8 text-blue-600" />
//               </div>
//               <h3 className="font-semibold mb-2">Browse Products</h3>
//               <p className="text-gray-600 text-sm">
//                 Explore our extensive product catalog
//               </p>
//             </div>
//             <div className="text-center">
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <ShoppingCart className="w-8 h-8 text-green-600" />
//               </div>
//               <h3 className="font-semibold mb-2">Place Order</h3>
//               <p className="text-gray-600 text-sm">
//                 Quick and secure checkout process
//               </p>
//             </div>
//             <div className="text-center">
//               <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Truck className="w-8 h-8 text-purple-600" />
//               </div>
//               <h3 className="font-semibold mb-2">Partner Pickup</h3>
//               <p className="text-gray-600 text-sm">
//                 Delivery partner accepts and picks up
//               </p>
//             </div>
//             <div className="text-center">
//               <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <MapPin className="w-8 h-8 text-orange-600" />
//               </div>
//               <h3 className="font-semibold mb-2">Fast Delivery</h3>
//               <p className="text-gray-600 text-sm">
//                 Real-time tracking until delivery
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Highlight */}
//       <section className="py-20 px-4 bg-white">
//         <div className="container mx-auto">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div>
//               <h2 className="text-3xl md:text-4xl font-bold mb-6">
//                 Real-time Tracking & Management
//               </h2>
//               <p className="text-gray-600 mb-8 leading-relaxed">
//                 Stay connected throughout the entire delivery process with live
//                 updates, smart notifications, and comprehensive management tools
//                 for all stakeholders.
//               </p>
//               <div className="space-y-4">
//                 <div className="flex items-center space-x-3">
//                   <Clock className="w-6 h-6 text-blue-600" />
//                   <span>Live order status updates</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <MapPin className="w-6 h-6 text-green-600" />
//                   <span>GPS tracking for deliveries</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <BarChart3 className="w-6 h-6 text-purple-600" />
//                   <span>Comprehensive analytics dashboard</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <Users className="w-6 h-6 text-orange-600" />
//                   <span>Multi-user management system</span>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
//               <div className="bg-white rounded-xl p-6 shadow-lg">
//                 <div className="flex items-center justify-between mb-4">
//                   <span className="text-sm font-medium text-gray-500">
//                     Order #12345
//                   </span>
//                   <Badge className="bg-green-100 text-green-700">
//                     On the Way
//                   </Badge>
//                 </div>
//                 <div className="space-y-3">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                     <span className="text-sm">Order Confirmed</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                     <span className="text-sm">Picked Up</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
//                     <span className="text-sm font-medium">On the Way</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
//                     <span className="text-sm text-gray-400">Delivered</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
//         <div className="container mx-auto text-center">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
//             Ready to Transform Your Commerce?
//           </h2>
//           <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
//             Join thousands of customers, delivery partners, and businesses
//             already using our platform
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button
//               size="lg"
//               className="bg-white text-blue-600 hover:bg-gray-100"
//             >
//               Get Started Today
//             </Button>
//             <Button
//               size="lg"
//               variant="outline"
//               className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
//             >
//               Schedule Demo
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12 px-4">
//         <div className="container mx-auto">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
//                   <Zap className="w-5 h-5 text-white" />
//                 </div>
//                 <span className="text-xl font-bold">QuickCommerce</span>
//               </div>
//               <p className="text-gray-400 text-sm">
//                 The complete quick commerce platform for modern businesses.
//               </p>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4">Platform</h4>
//               <ul className="space-y-2 text-sm text-gray-400">
//                 <li>
//                   <Link to="#" className="hover:text-white transition-colors">
//                     Customer App
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="#" className="hover:text-white transition-colors">
//                     Partner App
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="#" className="hover:text-white transition-colors">
//                     Admin Dashboard
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4">Support</h4>
//               <ul className="space-y-2 text-sm text-gray-400">
//                 <li>
//                   <Link to="#" className="hover:text-white transition-colors">
//                     Help Center
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="#" className="hover:text-white transition-colors">
//                     Contact Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="#" className="hover:text-white transition-colors">
//                     API Docs
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4">Company</h4>
//               <ul className="space-y-2 text-sm text-gray-400">
//                 <li>
//                   <Link to="#" className="hover:text-white transition-colors">
//                     About
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="#" className="hover:text-white transition-colors">
//                     Careers
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="#" className="hover:text-white transition-colors">
//                     Privacy
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
//             <p>&copy; 2024 QuickCommerce. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
