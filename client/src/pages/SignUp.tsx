import AuthForm, { AuthDataType } from "@/components/AuthForm";
import Footer from "@/components/Footer";
import axios from "axios";

const SignUp = () => {
  const submit = async (data: AuthDataType) => {
    delete data.confirmPassword;
    await axios.post("http://localhost:3000/api/register", data);
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
