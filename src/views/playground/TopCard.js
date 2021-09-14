footerSlot={
    <ChartBarSimple
        className="mt-3 mx-3"
        style={{ height: '70px' }}
        backgroundColor="warning"
        label="Members"
        labels="months"
    />
}

<CDropdown>
<CDropdownToggle color="transparent">
    <CIcon name="cil-settings" />
</CDropdownToggle>
<CDropdownMenu className="pt-0" placement="bottom-end">
    <CDropdownItem>Action</CDropdownItem>
    <CDropdownItem>Another action</CDropdownItem>
    <CDropdownItem>Something else here...</CDropdownItem>
    <CDropdownItem disabled>Disabled action</CDropdownItem>
</CDropdownMenu>
</CDropdown>