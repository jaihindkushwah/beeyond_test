import { AuthContainer } from "@/components/AuthContainer";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
function VerifyOtp() {
  return (
    <AuthContainer onSubmit={(e) => e.preventDefault()}>
      <div className="w-full items-center flex justify-center flex-col">
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
        <div className="flex gap-4 mt-10">
          <Button variant={"outline"}>Verify</Button>
          <Button variant={"outline"}>Resend</Button>
        </div>
      </div>
    </AuthContainer>
  );
}

export default VerifyOtp;
