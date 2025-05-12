import AuthForm, { AuthDataType } from "@/components/AuthForm";
import Footer from "@/components/Footer";

const SignUp = () => {
  const submit = (data: AuthDataType) => {
    console.log(data);
    
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <AuthForm type="signup" back={submit} />
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;
