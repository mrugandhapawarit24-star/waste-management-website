# EcoWaste - Sustainable Waste Management Website

A modern, responsive waste management platform built with Next.js 15 that connects waste sellers with buyers to create a sustainable circular economy.

## 🌟 Features

### 🏠 Landing Page
- **User Type Selection**: Choose between Seller and Buyer roles
- **Responsive Design**: Mobile-first approach with beautiful UI
- **Hero Section**: Compelling messaging about sustainability
- **Features Overview**: Highlight key benefits of the platform

### 👤 Seller Features
- **Secure Login**: Protected seller dashboard access
- **Waste Listing Management**: Add, view, and manage waste materials
- **Weight Input**: Specify waste weight in kg, lbs, or tons
- **Pricing Control**: Set competitive prices per unit
- **Location Management**: Specify pickup/delivery locations
- **Status Tracking**: Monitor listing status (active, sold, pending)
- **Dashboard Analytics**: View total listings, active listings, and total value

### 🛒 Buyer Features
- **Secure Login**: Protected buyer dashboard access
- **Advanced Search**: Find waste materials by type, location, and keywords
- **Filtering System**: Narrow down results by material type and location
- **Material Browsing**: View detailed information about available waste
- **Favorites System**: Save interesting materials for later
- **Purchase Interface**: Easy-to-use buying process

### 🎨 Design & UX
- **Modern UI**: Clean, professional design with Tailwind CSS
- **Responsive Layout**: Works perfectly on all device sizes
- **Interactive Elements**: Smooth animations and transitions
- **Accessibility**: WCAG compliant design patterns
- **Icon Integration**: Lucide React icons for better visual communication

## 🚀 Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Authentication**: Local Storage (Demo)
- **Responsive Design**: Mobile-first approach

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Home page with user selection
│   ├── about/
│   │   └── page.tsx         # About page
│   ├── contact/
│   │   └── page.tsx         # Contact page with form
│   ├── seller/
│   │   ├── login/
│   │   │   └── page.tsx     # Seller login page
│   │   └── dashboard/
│   │       └── page.tsx     # Seller dashboard
│   └── buyer/
│       ├── login/
│       │   └── page.tsx     # Buyer login page
│       └── dashboard/
│           └── page.tsx     # Buyer dashboard
├── components/               # Reusable components (future)
└── types/                   # TypeScript type definitions (future)
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd waste-management-website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Open Browser
Navigate to [http://localhost:3000](http://loca
lhost:3000)

## 🔐 Demo Credentials

### Seller Account
- **Email**: seller@example.com
- **Password**: password

### Buyer Account
- **Email**: buyer@example.com
- **Password**: password

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🎯 Key Features Explained

### Weight Input System
Sellers can input waste weight using:
- **Units**: kg, lbs, tons
- **Precision**: Decimal values supported
- **Validation**: Required field with number input

### Dashboard Analytics
- **Total Listings**: Count of all waste materials
- **Active Listings**: Currently available materials
- **Total Value**: Combined value of all listings
- **Monthly Stats**: New listings added this month

### Search & Filter System
Buyers can:
- **Search**: By material type, description, or seller
- **Filter**: By material type and location
- **Sort**: Results by relevance and date
- **Save**: Favorite materials for quick access

## 🚧 Future Enhancements

- [ ] User registration system
- [ ] Real-time chat between buyers and sellers
- [ ] Payment gateway integration
- [ ] Mobile app development
- [ ] Advanced analytics and reporting
- [ ] Multi-language support
- [ ] Push notifications
- [ ] Image upload for waste materials
- [ ] GPS location services
- [ ] Waste quality verification system

## 🎨 Customization

### Colors
The website uses a custom color palette defined in `tailwind.config.js`:
- **Primary**: Green shades for sustainability theme
- **Secondary**: Gray shades for professional look
- **Accent**: Various colors for different UI elements

### Styling
- **Components**: Pre-built component classes in `globals.css`
- **Responsiveness**: Mobile-first CSS approach
- **Animations**: Smooth transitions and hover effects

## 📊 Performance Features

- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js built-in image optimization
- **CSS Optimization**: Tailwind CSS purging for production
- **Lazy Loading**: Components load as needed

## 🔒 Security Features

- **Route Protection**: Protected dashboard routes
- **Input Validation**: Form validation and sanitization
- **Authentication**: Session management (demo implementation)

## 🧪 Testing

To run tests (when implemented):
```bash
npm run test
```

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🌍 Environment Variables

Create a `.env.local` file for environment-specific configurations:
```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_APP_NAME=EcoWaste
```

## 📈 Analytics & Monitoring

The platform is ready for integration with:
- Google Analytics
- Sentry for error tracking
- Performance monitoring tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- **Email**: support@ecowaste.com
- **Documentation**: [docs.ecowaste.com](https://docs.ecowaste.com)
- **Issues**: GitHub Issues page

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icon set
- The open-source community for inspiration

---

**EcoWaste** - Building a sustainable future through smart waste management 🌱♻️


