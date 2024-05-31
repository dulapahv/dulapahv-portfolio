"use client";

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Chip,
  Divider,
  Input,
  Kbd,
  Listbox,
  ListboxItem,
  ListboxSection,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import { isMobile } from "react-device-detect";

import commands from "./Commands";

export interface CommandMenuModalRef {
  openModal: () => void;
  closeModal: () => void;
}

const CommandMenu = forwardRef<CommandMenuModalRef>((props, ref) => {
  const [search, setSearch] = useState("");

  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useImperativeHandle(ref, () => ({
    openModal: onOpen,
    closeModal: onClose,
  }));

  useEffect(() => {
    if (!isOpen) {
      setSearch("");
    }
  }, [isOpen]);

  const filteredCommands = commands.filter((command) =>
    command.label.toLowerCase().includes(search.toLowerCase()),
  );

  const renderCommands = (section: string) => {
    const sectionCommands = filteredCommands.filter(
      (command) => command.section === section,
    );
    if (sectionCommands.length === 0)
      return (
        <ListboxItem
          key={section}
          textValue="No commands found"
          aria-hidden="true"
          className="hidden"
        />
      );
    return (
      <ListboxSection
        key={section}
        title={section}
        classNames={{
          heading: "font-medium",
        }}
      >
        {sectionCommands.map((command) => {
          if (
            command.key === "copy_short_url" &&
            !pathname.startsWith("/experience/") &&
            !pathname.startsWith("/project/") &&
            !pathname.startsWith("/blog/")
          )
            return (
              <ListboxItem
                key={command.key}
                textValue="Disabled"
                aria-hidden="true"
                className="hidden"
              />
            );

          return (
            <ListboxItem
              key={command.key}
              startContent={command.icon}
              endContent={
                command.key === "system" ||
                command.key === "light" ||
                command.key === "dark" ? (
                  theme === command.key ? (
                    <Chip
                      variant="bordered"
                      className="h-5 rounded-md border-1 text-xs text-default-500"
                    >
                      Current
                    </Chip>
                  ) : undefined
                ) : undefined
              }
              href={command.href}
              classNames={{
                base: "dark:data-[hover=true]:bg-neutral-900 data-[hover=true]:bg-gray-100 py-2.5",
                title: "font-medium",
              }}
            >
              {command.label}
            </ListboxItem>
          );
        })}
      </ListboxSection>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      hideCloseButton
      size="2xl"
      radius="md"
      scrollBehavior="inside"
      classNames={{
        wrapper: "!items-start overflow-y-hidden",
        base: "min-[575px]:my-16 m-4 min-[575px]:mx-6 border-1 border-default-200 bg-white dark:bg-zinc-950 !max-h-[512px]",
      }}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.2,
              ease: "easeOut",
            },
          },
          exit: {
            y: -10,
            opacity: 0,
            scale: 0.95,
            transition: {
              duration: 0.1,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col p-4 pb-0">
              <Chip
                variant="bordered"
                endContent={
                  <Kbd className="h-4 rounded-sm bg-default-50 text-xs">
                    Ctrl K
                  </Kbd>
                }
                className="h-6 rounded-md border-1 px-2 text-xs text-default-500 *:select-none [&>span]:pl-0"
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    onOpen();
                  }, 50);
                }}
              >
                Command Menu
              </Chip>
              <div className="flex items-center">
                <Input
                  type="text"
                  placeholder="What do you need?"
                  size="lg"
                  autoFocus={!isMobile}
                  isClearable={isMobile}
                  value={search}
                  onValueChange={setSearch}
                  classNames={{
                    inputWrapper:
                      "px-0 bg-transparent group-data-[hover=true]:bg-transparent data-[focus=true]:!bg-transparent data-[focus-visible=true]:!ring-0 data-[focus-visible=true]:!ring-offset-transparent data-[focus-visible=true]:!ring-offset-0",
                    input: "font-medium",
                  }}
                />
                <Kbd
                  className="h-6 cursor-pointer rounded-md border-1 border-default-200 bg-default-50 bg-transparent hover:bg-default-50"
                  onClick={onClose}
                >
                  Esc
                </Kbd>
              </div>
            </ModalHeader>
            <Divider className="h-[0.5px] bg-default-200" />
            <ModalBody className="p-1">
              {filteredCommands.length > 0 ? (
                <Listbox
                  aria-label="Actions"
                  onAction={(key) => {
                    switch (key) {
                      case "dark":
                        setTheme("dark");
                        break;
                      case "light":
                        setTheme("light");
                        break;
                      case "system":
                        setTheme("system");
                        break;
                      case "copy_url":
                        navigator.clipboard.writeText(window.location.href);
                        break;
                      case "copy_short_url":
                        navigator.clipboard.writeText(
                          window.location.href.split("-")[0],
                        );
                        break;
                      default:
                        break;
                    }
                    onClose();
                  }}
                  classNames={{
                    list: "*:rounded-md",
                  }}
                >
                  {["Theme", "General", "Navigation", "Developer"].map(
                    (section) => renderCommands(section),
                  )}
                </Listbox>
              ) : (
                <div className="p-4 text-center text-sm font-medium text-default-500">
                  No results found for{" "}
                  <span className="text-default-800">&quot;{search}&quot;</span>
                  .
                </div>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
});

CommandMenu.displayName = "CommandMenu";

export default CommandMenu;
