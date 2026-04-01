import { signIn } from "@/api/auth";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useSignIn(callbacks: UseMutationCallback) {
  return useMutation({
    mutationFn: signIn,
    // throw new Error 객체 여기로 넘어옴
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
