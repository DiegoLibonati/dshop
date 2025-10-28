import React, { useRef } from "react";

import { MenuHeaderProps } from "@src/entities/props";

import { MenuScreenWhite } from "@src/components/core/Menus/MenuScreenWhite/MenuScreenWhite";
import { FormSearch } from "@src/components/core/Forms/FormSearch/FormSearch";
import { ButtonBlack } from "@src/components/core/Buttons/ButtonBlack/ButtonBlack";
import { SvgClose } from "@src/components/core/Svgs/SvgClose/SvgClose";

import { lang } from "@src/constants/lang";

import { getIdsByLength } from "shared_core/SharedCore";

import "@src/components/composed/Menus/MenuHeader/MenuHeader.css";

const MenuHeader = ({
  isMenuOpen,
  children,
  language = "en",
  handleClickMenuClose,
}: MenuHeaderProps) => {
  const idsMenuHeader = useRef<string[]>(getIdsByLength(4));

  const handleClickSubmit = (inputValue: string) => {
    console.log(inputValue);
  };

  return (
    <MenuScreenWhite
      idRoot={idsMenuHeader.current[0]}
      className={`menu-header ${isMenuOpen && "menu-header--open"}`}
    >
      {children}

      <hr className="menu-header__separator"></hr>

      <FormSearch
        idRoot={idsMenuHeader.current[1]}
        className="menu-header__form"
        onSubmit={handleClickSubmit}
        placeholder={lang[language].header.placeholder}
      ></FormSearch>

      <ButtonBlack
        idRoot={idsMenuHeader.current[2]}
        ariaLabel="close menu header"
        onClick={handleClickMenuClose}
        className="menu-header__btn-close"
      >
        <SvgClose
          idRoot={idsMenuHeader.current[3]}
          className="menu-header__btn-close-icon"
          classNameWrapper="menu-header__btn-close-icon-wrapper"
        ></SvgClose>
      </ButtonBlack>
    </MenuScreenWhite>
  );
};

export default MenuHeader;
