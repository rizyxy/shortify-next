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

export default function RegisterForm() {
  return (
    <form>
      <FieldSet>
        <FieldTitle className="text-xl font-bold">Create an account</FieldTitle>
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
          <Field>
            <FieldLabel>Retype Password</FieldLabel>
            <InputGroup>
              <InputGroupInput name="confirmPassword" placeholder="********" />
              <InputGroupAddon>
                <LucideLock />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Button type="submit">Create Account</Button>
          <p className="text-center">
            Already have an account?{" "}
            <Link
              href={"/auth/login"}
              className="text-primary hover:opacity-50"
            >
              Login
            </Link>
          </p>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
