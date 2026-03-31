import { signUP } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export function useSignup() {
  return useMutation({
    mutationFn: signUP,
  });
}
