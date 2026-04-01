import { Button } from "@/components/ui/button";
import { useSignup } from "@/hooks/mutations/use-sign-up";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import { signUP } from "@/api/auth";

interface inputForm {
  email: string;
  password: string;
}

export default function SignUpPage() {
  const { mutate: signUP, isSuccess, error } = useSignup();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<inputForm>();

  const handleSignUpClick: SubmitHandler<inputForm> = (data) => {
    const { email, password } = data;
    signUP({ email, password });

    if (isSuccess) {
      alert("회원가입 완료되었습니다.");
      resetField("email");
      resetField("password");
    }
  };

  return (
    <div className="flex flex-col gap-9">
      <div className="flex justify-center text-xl font-bold">회원가입</div>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleSignUpClick)}
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
        <div>
          <Button className="h-15 w-full" type="submit">
            회원가입
          </Button>
        </div>
        {error && <p className="text-red-500">{error.message}</p>}
      </form>
      <div className="flex justify-center">
        <Link className="text-muted-foreground hover:underline" to={"/sign-in"}>
          이미 계정이 있다면? 로그인
        </Link>
      </div>
    </div>
  );
}
