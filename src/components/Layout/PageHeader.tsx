import React, { useEffect, useState } from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as ArrowRightIcon } from "../../assets/arrow-right.svg";
import { ReactComponent as ArrowRightBlackIcon } from "../../assets/arrow-right-black.svg";
import { ReactComponent as Hamburger } from "../../assets/hamburger.svg";

import styled from "styled-components";
import { Popover } from "antd";
import { PopoverMenu } from "../PopoverMenu";
import { VersionSelect } from "../VersionSelect";
import { isMainnet } from "../../light-godwoken/env";
const StyledPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 100px;
  height: 64px;
  margin-bottom: 24px;
  background: white;
  color: black;
  .logo-container {
    width: 182px;
  }
  .link-list {
    display: flex;
  }
  .right-side {
    display: flex;
    justify-content: end;
    > &:hover {
      cursor: pointer;
    }
  }
  .hamburger-menu {
    cursor: pointer;
  }
  @media (max-width: 600px) {
    padding: 16px 8px;
    .right-side {
      display: none;
    }
  }
`;
const Link = styled.span`
  height: 32px;
  line-height: 32px;
  width: 160px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: black;
  border-radius: 8px;
  @media (max-width: 600px) {
    width: 100px;
    .right-side {
      display: none;
    }
  }
  &.active {
    background: rgb(232, 0, 111);
    color: white;
  }
  &:hover {
    cursor: pointer;
  }
`;

interface Props {
  onViewChange?: (view: string) => void;
}
const PageHeader: React.FC<Props> = ({ onViewChange }) => {
  const [active, setActive] = useState("deposit");
  const [popoverVisible, setPopoverVisible] = useState(false);
  const changeViewToDeposit = () => {
    setActive("deposit");
    onViewChange && onViewChange("deposit");
  };
  const changeViewToWithdrawal = () => {
    setActive("withdrawal");
    onViewChange && onViewChange("withdrawal");
  };
  const openPopoverMenu = () => {
    setPopoverVisible(true);
  };

  const closePopoverMenu = () => {
    setPopoverVisible(false);
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      const target = document.querySelector(".hamburger-menu");
      if (!(e.target && e.target instanceof Element && (e.target === target || target?.contains(e.target)))) {
        closePopoverMenu();
      }
    });
  });

  return (
    <StyledPage>
      <div className="logo-container">
        <Logo height={32}></Logo>
      </div>
      <div className="link-list">
        <Link onClick={changeViewToDeposit} className={active === "deposit" ? "active" : ""}>
          Axon {active === "deposit" ? <ArrowRightIcon /> : <ArrowRightBlackIcon />} CKB
        </Link>
        <Link onClick={changeViewToWithdrawal} className={active === "withdrawal" ? "active" : ""}>
          CKB {active === "withdrawal" ? <ArrowRightIcon /> : <ArrowRightBlackIcon />} Axon
        </Link>
      </div>
      <div className="right-side">
        <VersionSelect></VersionSelect>
        {!isMainnet && (
          <Popover
            content={() => <PopoverMenu handleClick={closePopoverMenu}></PopoverMenu>}
            trigger="click"
            overlayClassName="popover-menu"
            visible={popoverVisible}
            placement="bottomLeft"
          >
            <Hamburger className="hamburger-menu" onClick={openPopoverMenu}></Hamburger>
          </Popover>
        )}
      </div>
    </StyledPage>
  );
};

export default PageHeader;
