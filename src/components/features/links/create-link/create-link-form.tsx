"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
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
import createLink from "@/lib/actions/link/create-link";
import { LucideLink2, LucideLoaderCircle } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function CreateLinkForm() {
  const [state, formAction, isPending] = useActionState(createLink, {
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
        <FieldTitle className="text-xl font-bold">Shorten an URL</FieldTitle>
        <FieldGroup>
          <Field>
            <FieldLabel>Original URL</FieldLabel>
            <FieldDescription>
              Enter the URL you want to shorten
            </FieldDescription>
            <InputGroup>
              <InputGroupInput name="url" placeholder="https://example.com" />
              <InputGroupAddon>
                <LucideLink2 />
              </InputGroupAddon>
            </InputGroup>
            {state.errors?.url && <FieldError>{state.errors.url}</FieldError>}
          </Field>
          <Field>
            <FieldLabel>Shortened URL</FieldLabel>
            <FieldDescription>Give your URL a custom alias</FieldDescription>
            <InputGroup>
              <InputGroupInput name="shortUrl" placeholder="example" />
              <InputGroupAddon>
                <LucideLink2 />
              </InputGroupAddon>
            </InputGroup>
            {state.errors?.shortUrl && (
              <FieldError>{state.errors.shortUrl}</FieldError>
            )}
          </Field>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <LucideLoaderCircle className="animate-spin" />
            ) : (
              "Shorten URL"
            )}
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
