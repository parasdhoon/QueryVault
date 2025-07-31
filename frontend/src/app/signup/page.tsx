import AuthForm from '@/components/AuthForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <Header />
      <AuthForm type="signup" />
      <Footer />
    </div>
  );
}