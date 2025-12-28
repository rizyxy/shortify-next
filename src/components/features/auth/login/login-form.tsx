"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
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
import { LucideLock, LucideMail } from "lucide-react";
import Link from "next/link";

export default function LoginForm() {
  return (
    <form>
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
          </Field>
          <Field>
            <FieldLabel>Password</FieldLabel>
            <InputGroup>
              <InputGroupInput name="password" placeholder="********" />
              <InputGroupAddon>
                <LucideLock />
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <Button type="submit">Login</Button>
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
