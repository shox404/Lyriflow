
import AuthForm from "@/components/AuthForm";
import Footer from "@/components/Footer";

const SignIn = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <AuthForm type="signin" />
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
