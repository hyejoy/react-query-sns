import { Button } from "@/components/ui/button";
import { useSignIn } from "@/hooks/mutations/use-sign-in";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import gitHubLogo from "@/assets/github-mark.svg";
import { useSignWithOAuth } from "@/hooks/mutations/use-sign-in-with-oauth";
import kakaoLogo from "@/assets/kakao_login.png";
import { toast } from "sonner";
import { generateErrorMessage } from "@/lib/error";

interface inputForm {
  email: string;
  password: string;
}

export default function SignInPage() {
  /** react-hook-form */
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<inputForm>();

  /** mutation */

  // 아이디 비밀번호 입력
  const {
    mutate: signIn,
    isSuccess,
    isPending: isSignInWithPasswordPending,
  } = useSignIn({
    onError: (error) => {
      const message = generateErrorMessage(error);
      toast.error(message, {
        position: "top-center",
        style: { backgroundColor: "red", color: "white" },
      });
      resetField("password");
    },
  });

  // 소셜로그인
  const { mutate: signInWithOAuth, isPending: isSignInOAuthPending } =
    useSignWithOAuth({
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, {
          position: "top-center",
          style: { backgroundColor: "red", color: "white" },
        });
      },
    });

  const handleSignInClick: SubmitHandler<inputForm> = (data) => {
    const { email, password } = data;
    signIn({ email, password });
    if (isSuccess) {
      // 로그인성공
      console.log("로그인 성공");
    }
  };

  const isPending = isSignInOAuthPending || isSignInWithPasswordPending;

  return (
    <div className="flex flex-col gap-9">
      <div className="flex justify-center text-xl font-bold">로그인</div>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleSignInClick)}
      >
        <input
          className="rounded-md border p-4"
          {...register("email", {
            required: "이메일은 필수 입력 항목입니다.",
          })}
          placeholder="example@naver.com"
        />
        {errors.email && <p className="text-red-400">{errors.email.message}</p>}
        <input
          {...register("password", {
            required: "비밀번호를 입력 해 주세요.",
          })}
          type="password"
          className="rounded-md border p-4"
          placeholder="비밀번호를 입력해 주세요."
        />
        {errors.password && (
          <p className="text-red-400">{errors.password.message}</p>
        )}
        <div className="flex flex-col gap-2">
          <Button className="h-15 w-full" type="submit" disabled={isPending}>
            로그인
          </Button>
          <Button
            type="button"
            onClick={() => signInWithOAuth("kakao")}
            className="h-15 w-full"
            variant={"outline"}
            disabled={isPending}
          >
            <img src={kakaoLogo} className="h-5 w-5" />
            KAKAO 계정으로 로그인
          </Button>
          <Button
            type="button"
            onClick={() => signInWithOAuth("github")}
            className="h-15 w-full"
            variant={"outline"}
            disabled={isPending}
          >
            <img src={gitHubLogo} className="h-4 w-4" />
            GitHub 계정으로 로그인
          </Button>
        </div>
      </form>
      <div className="flex justify-center">
        <Link className="text-muted-foreground hover:underline" to={"/sign-up"}>
          계정이 없으시다면? 회원가입
        </Link>
      </div>
    </div>
  );
}
