import { AuthContainer } from "@/components/AuthContainer";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

function ResetEmailForm() {
  return <Input type="email" placeholder="Email" className="w-full" required />;
}

function OtpVerificationForm() {
  return (
    <div className="flex gap-4 w-full items-center justify-center">
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}

function SetNewPasswordForm() {
  return (
    <>
      <Input
        type="password"
        placeholder="New Password"
        className="w-full"
        required
      />
      <Input
        type="password"
        placeholder="Confirm Password"
        className="w-full"
        required
      />
    </>
  );
}
function ResetPassword() {
  const [isSent, setIsSent] = useState(false);
  const [isVerifiedOtp, setIsVerifiedOtp] = useState(false);

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSent) setIsSent(true);
    else if (!isVerifiedOtp) setIsVerifiedOtp(true);
    else alert("Password reset flow completed");
  };

  return (
    <AuthContainer title="Reset Password" onSubmit={formHandler}>
      {!isSent && <ResetEmailForm />}
      {isSent && !isVerifiedOtp && <OtpVerificationForm />}
      {isSent && isVerifiedOtp && <SetNewPasswordForm />}
      <Button className="w-full">
        {!isSent
          ? "Send OTP"
          : !isVerifiedOtp
          ? "Verify OTP"
          : "Reset Password"}
      </Button>
    </AuthContainer>
  );
}

export default ResetPassword;
