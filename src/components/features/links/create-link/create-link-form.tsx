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
import { LucideLink2 } from "lucide-react";

export default function CreateLinkForm() {
  return (
    <form>
      <FieldSet>
        <FieldTitle className="text-xl font-bold">Shorten a link</FieldTitle>
        <FieldGroup>
          <Field>
            <FieldLabel>Original Link</FieldLabel>
            <InputGroup>
              <InputGroupInput
                name="originalLink"
                placeholder="https://example.com"
              />
              <InputGroupAddon>
                <LucideLink2 />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel>Shortened Link</FieldLabel>
            <InputGroup>
              <InputGroupInput name="shortenedLink" placeholder="example" />
              <InputGroupAddon>
                <LucideLink2 />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Button type="submit">Shorten</Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
