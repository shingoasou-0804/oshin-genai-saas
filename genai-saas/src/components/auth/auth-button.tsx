import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Button } from "../ui/button";

const AuthButton = async () => {
  const { userId } = await auth();

  if (userId) {
    return (
      <UserButton
        appearance={{
          elements: {
            avatarBox: "h-10 w-10",
          },
        }}
      />
    );
  }
  return (
    <div className="flex items-center gap-4">
      <SignInButton
        mode="modal"
        fallbackRedirectUrl={"/dashboard"}
        forceRedirectUrl={"/dashboard"}
      >
        <Button variant={"outline"}>ログイン</Button>
      </SignInButton>
      <SignUpButton
        mode="modal"
        fallbackRedirectUrl={"/dashboard"}
        forceRedirectUrl={"/dashboard"}
      >
        <Button variant={"default"}>新規登録</Button>
      </SignUpButton>
    </div>
  )
}

export default AuthButton
