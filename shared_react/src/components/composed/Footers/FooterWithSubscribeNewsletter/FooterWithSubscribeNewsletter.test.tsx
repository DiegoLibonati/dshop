import { render, screen } from "@testing-library/react";

import { FooterWithSubscribeNewsletterProps } from "@src/entities/props";

import { FooterWithSubscribeNewsletter } from "@src/components/composed/Footers/FooterWithSubscribeNewsletter/FooterWithSubscribeNewsletter";

import { footerLinks } from "@src/constants/footer";

import { Locale } from "shared_core/SharedCoreEntities";

type RenderComponent = {
  props: FooterWithSubscribeNewsletterProps & {
    onSubmitSubscribe: jest.Mock;
  };
  container: HTMLElement;
};

const renderComponent = (
  instagram: string,
  facebook: string,
  twitter: string,
  language: Locale
): RenderComponent => {
  const props: FooterWithSubscribeNewsletterProps & {
    onSubmitSubscribe: jest.Mock;
  } = {
    title: "title",
    description: "description",
    language: language ?? "en",
    facebook: facebook ?? "",
    instagram: instagram ?? "",
    twitter: twitter ?? "",
    className: "test-clas",
    onSubmitSubscribe: jest.fn(),
  };

  const { container } = render(
    <FooterWithSubscribeNewsletter
      title={props.title}
      description={props.description}
      facebook={props.facebook}
      instagram={props.instagram}
      twitter={props.twitter}
      language={props.language}
      className={props.className}
      onSubmitSubscribe={props.onSubmitSubscribe}
    >
      {props.children}
    </FooterWithSubscribeNewsletter>
  );

  return {
    props: props,
    container: container,
  };
};

describe("FooterWithSubscribeNewsletter.tsx", () => {
  describe("General Tests.", () => {
    const instagram = "";
    const facebook = "";
    const twitter = "";
    const language = "en";

    test("It must render the component.", () => {
      const { container, props } = renderComponent(
        instagram,
        facebook,
        twitter,
        language
      );

      const root = container.querySelector<HTMLDivElement>(
        ".footer-with-subscribe-newsletter"
      );
      const subscribeNewsletter = container.querySelector<HTMLDivElement>(
        ".footer-with-subscribe-newsletter__subscribe"
      );
      const title = screen.getByRole("heading", { name: props.title });
      const description = screen.getByText(props.description);
      const cr = screen.getByText(`${props.title} © All Rights Reserved`);
      const payments = screen.getByAltText("payments");

      expect(root).toBeInTheDocument();
      expect(subscribeNewsletter).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(cr).toBeInTheDocument();
      expect(payments).toBeInTheDocument();
    });
  });

  describe("With social medias.", () => {
    const instagram = "link";
    const facebook = "link";
    const twitter = "link";

    const totalMedias = 3;

    const language = "en";

    test("It must render all social media.", () => {
      const { container } = renderComponent(
        instagram,
        facebook,
        twitter,
        language
      );

      const socialMedias = container.querySelectorAll<HTMLElement>(
        ".footer-with-subscribe-newsletter__content-social-wrapper"
      );

      expect(socialMedias).toHaveLength(totalMedias);
    });
  });

  describe("Without social medias.", () => {
    const instagram = "";
    const facebook = "";
    const twitter = "";

    const language = "en";

    test("It must NOT render social medias.", () => {
      const { container } = renderComponent(
        instagram,
        facebook,
        twitter,
        language
      );

      const socialMedias = container.querySelector<HTMLDivElement>(
        "footer-with-subscribe-newsletter__content-socials"
      );

      expect(socialMedias).not.toBeInTheDocument();
    });
  });
});
