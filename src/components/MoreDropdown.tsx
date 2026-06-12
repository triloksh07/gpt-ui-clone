function MoreDropdown() {
  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>
        <SidebarMenuButton>
          <MoreHorizontal />
          <span>More</span>
        </SidebarMenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="right">

        <DropdownMenuItem>
          <Bot />
          GPTs
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Image />
          Images
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Microscope />
          Deep Research
        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>
  );
}