"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import login from "@/lib/actions/auth/login";
import { LucideLoaderCircle, LucideLock, LucideMail } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, {
    message: null,
    errors: null,
  });

  useEffect(() => {
    if (state.message) {
      toast(state.message);
    }
  }, [state.message]);

  return (
    <form action={formAction}>
      <FieldSet>
        <FieldTitle className="text-xl font-bold">
          Login to your account
        </FieldTitle>
        <FieldGroup>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <InputGroup>
              <InputGroupInput name="email" placeholder="example@gmail.com" />
              <InputGroupAddon>
                <LucideMail />
              </InputGroupAddon>
            </InputGroup>
            {state.errors?.email && (
              <FieldError>{state.errors.email}</FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel>Password</FieldLabel>
            <InputGroup>
              <InputGroupInput name="password" placeholder="********" />
              <InputGroupAddon>
                <LucideLock />
              </InputGroupAddon>
            </InputGroup>
            {state.errors?.password && (
              <FieldError>{state.errors.password}</FieldError>
            )}
          </Field>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <LucideLoaderCircle className="animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
          <p className="text-center">
            Don't have an account?{" "}
            <Link
              href={"/auth/register"}
              className="text-primary hover:opacity-50"
            >
              Register
            </Link>
          </p>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
