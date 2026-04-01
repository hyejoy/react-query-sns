import { signUP } from "@/api/auth";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useSignup(callbacks: UseMutationCallback) {
  return useMutation({
    mutationFn: signUP,
    onError: (error) => {
      if (callbacks.onError) callbacks.onError(error);
    },
  });
}
