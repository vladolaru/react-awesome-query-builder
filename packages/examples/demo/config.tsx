import React, { Component } from "react";
import merge from "lodash/merge";
import {
  BasicFuncs,
  Utils,
  // types:
  Operators,
  Widgets,
  Fields,
  Config,
  Types,
  Conjunctions,
  LocaleSettings,
  OperatorProximity,
  Funcs,
  //DateTimeFieldSettings,
} from "@react-awesome-query-builder/core";
import {
  BasicConfig,
  // types:
  Settings,
  DateTimeFieldSettings,
} from "@react-awesome-query-builder/ui";
import moment from "moment";
import ru_RU from "antd/es/locale/ru_RU";
import { ruRU } from "@material-ui/core/locale";
import { ruRU as muiRuRU } from "@mui/material/locale";

import { AntdConfig, AntdWidgets } from "@react-awesome-query-builder/antd";
import { MuiConfig } from "@react-awesome-query-builder/mui";
import { MaterialConfig } from "@react-awesome-query-builder/material";
import { BootstrapConfig } from "@react-awesome-query-builder/bootstrap";
import { FluentUIConfig } from "@react-awesome-query-builder/fluent";
const { FieldSelect, FieldDropdown, FieldCascader, FieldTreeSelect } =
  AntdWidgets;
const { simulateAsyncFetch } = Utils.Autocomplete;

const skinToConfig: Record<string, Config> = {
  vanilla: BasicConfig,
  antd: AntdConfig,
  material: MaterialConfig,
  mui: MuiConfig,
  bootstrap: BootstrapConfig,
  fluent: FluentUIConfig,
};

export default (skin: string) => {
  const InitialConfig = skinToConfig[skin] as BasicConfig;

  const demoListValues = [
    { title: "A", value: "a" },
    { title: "AA", value: "aa" },
    { title: "AAA1", value: "aaa1" },
    { title: "AAA2", value: "aaa2" },
    { title: "B", value: "b" },
    { title: "C", value: "c" },
    { title: "D", value: "d" },
    { title: "E", value: "e" },
    { title: "F", value: "f" },
    { title: "G", value: "g" },
    { title: "H", value: "h" },
    { title: "I", value: "i" },
    { title: "J", value: "j" },
  ];
  const simulatedAsyncFetch = simulateAsyncFetch(demoListValues, 3);

  const conjunctions: Conjunctions = {
    ...InitialConfig.conjunctions,
  };

  const proximity: OperatorProximity = {
    ...InitialConfig.operators.proximity,
    valueLabels: [
      { label: "Word 1", placeholder: "Enter first word" },
      { label: "Word 2", placeholder: "Enter second word" },
    ],
    textSeparators: [
      //'Word 1',
      //'Word 2'
    ],
    options: {
      ...InitialConfig.operators.proximity.options,
      optionLabel: "Near", // label on top of "near" selectbox (for config.settings.showLabels==true)
      optionTextBefore: "Near", // label before "near" selectbox (for config.settings.showLabels==false)
      optionPlaceholder: "Select words between", // placeholder for "near" selectbox
      minProximity: 2,
      maxProximity: 10,
      defaults: {
        proximity: 2,
      },
      customProps: {},
    },
  };

  const operators: Operators = {
    ...InitialConfig.operators,
    // examples of  overriding
    proximity,
    between: {
      ...InitialConfig.operators.between,
      valueLabels: ["Value from", "Value to"],
      textSeparators: ["from", "to"],
    },
  };

  const widgets: Widgets = {
    ...InitialConfig.widgets,
    // examples of  overriding
    text: {
      ...InitialConfig.widgets.text,
    },
    textarea: {
      ...InitialConfig.widgets.textarea,
      maxRows: 3,
    },
    slider: {
      ...InitialConfig.widgets.slider,
    },
    rangeslider: {
      ...InitialConfig.widgets.rangeslider,
    },
    date: {
      ...InitialConfig.widgets.date,
      dateFormat: "DD.MM.YYYY",
      valueFormat: "YYYY-MM-DD",
    },
    time: {
      ...InitialConfig.widgets.time,
      timeFormat: "HH:mm",
      valueFormat: "HH:mm:ss",
    },
    datetime: {
      ...InitialConfig.widgets.datetime,
      timeFormat: "HH:mm",
      dateFormat: "DD.MM.YYYY",
      valueFormat: "YYYY-MM-DD HH:mm:ss",
    },
    func: {
      ...InitialConfig.widgets.func,
      customProps: {
        showSearch: true,
      },
    },
    select: {
      ...InitialConfig.widgets.select,
    },
    multiselect: {
      ...InitialConfig.widgets.multiselect,
      customProps: {
        //showCheckboxes: false,
        width: "200px",
        input: {
          width: "100px",
        },
      },
    },
    treeselect: {
      ...InitialConfig.widgets.treeselect,
      customProps: {
        showSearch: true,
      },
    },
  };

  const types: Types = {
    ...InitialConfig.types,
    // examples of  overriding
    text: {
      ...InitialConfig.types.text,
      excludeOperators: ["proximity"],
    },
    boolean: merge(InitialConfig.types.boolean, {
      widgets: {
        boolean: {
          widgetProps: {
            hideOperator: true,
            operatorInlineLabel: "is",
          },
          opProps: {
            equal: {
              label: "is",
            },
            not_equal: {
              label: "is not",
            },
          },
        },
      },
    }),
  };

  const localeSettings: LocaleSettings = {
    locale: {
      moment: "ru",
      antd: ru_RU,
      material: ruRU,
      mui: muiRuRU,
    },
    valueLabel: "Value",
    valuePlaceholder: "Value",
    fieldLabel: "Field",
    operatorLabel: "Operator",
    funcLabel: "Function",
    fieldPlaceholder: "Select field",
    funcPlaceholder: "Select function",
    operatorPlaceholder: "Select operator",
    lockLabel: "Lock",
    lockedLabel: "Locked",
    deleteLabel: null,
    addGroupLabel: "Add group",
    addRuleLabel: "Add rule",
    addSubRuleLabel: "Add sub rule",
    delGroupLabel: null,
    notLabel: "Not",
    valueSourcesPopupTitle: "Select value source",
    removeRuleConfirmOptions: {
      title: "Are you sure delete this rule?",
      okText: "Yes",
      okType: "danger",
      cancelText: "Cancel",
    },
    removeGroupConfirmOptions: {
      title: "Are you sure delete this group?",
      okText: "Yes",
      okType: "danger",
      cancelText: "Cancel",
    },
  };

  const settings: Settings = {
    ...InitialConfig.settings,
    ...localeSettings,

    defaultSliderWidth: "200px",
    defaultSelectWidth: "200px",
    defaultSearchWidth: "100px",
    defaultMaxRows: 5,

    valueSourcesInfo: {
      value: {
        label: "Value",
      },
      field: {
        label: "Field",
        widget: "field",
      },
      func: {
        label: "Function",
        widget: "func",
      },
    },
    // canReorder: true,
    // canRegroup: true,
    // showLock: true,
    // showNot: true,
    // showLabels: true,
    maxNesting: 5,
    canLeaveEmptyGroup: true,
    shouldCreateEmptyGroup: false,
    showErrorMessage: true,
    customFieldSelectProps: {
      showSearch: true,
    },
    renderField: (props) => <FieldCascader {...props} />,
    // renderOperator: (props) => <FieldDropdown {...props} />,
    // renderFunc: (props) => <FieldSelect {...props} />,
    // maxNumberOfRules: 10 // number of rules can be added to the query builder
  };

  //////////////////////////////////////////////////////////////////////

  const fields: Fields = {
    merchant: {
      label: "Merchant",
      tooltip: "Group of fields",
      type: "!struct",
      subfields: {
        firstName: {
          label: "First name",
          type: "text",
          mainWidgetProps: {
            valueLabel: "First Name",
            valuePlaceholder: "Enter first name",
          },
        },
        lastName: {
          label: "Last name",
          type: "text",
          mainWidgetProps: {
            valueLabel: "Last Name",
            valuePlaceholder: "Enter last name",
          },
        },
        fullName: {
          label: "Full name",
          type: "text",
          mainWidgetProps: {
            valueLabel: "Full Name",
            valuePlaceholder: "Enter full name",
          },
        },
        email: {
          label: "Email",
          type: "text",
          mainWidgetProps: {
            valueLabel: "Email",
            valuePlaceholder: "Enter email",
          },
        },
        phone: {
          label: "Phone",
          type: "text",
          mainWidgetProps: {
            valueLabel: "Phone",
            valuePlaceholder: "Enter phone number",
          },
        },
      },
    },
    business: {
      label: "Business",
      tooltip: "Group of fields",
      type: "!struct",
      subfields: {
        name: {
          label: "Name",
          type: "text",
          mainWidgetProps: {
            valueLabel: "Name",
            valuePlaceholder: "Enter business name",
          },
        },
        url: {
          label: "URL", //only for menu's toggler
          type: "text",
          mainWidgetProps: {
            valueLabel: "URL",
            valuePlaceholder: "Enter business URL",
          },
        },
        country: {
          label: "Country",
          type: "select",
          valueSources: ["value"],
          fieldSettings: {
            showSearch: true,
            listValues: [
              { value: "US", title: "USA" },
              { value: "CA", title: "Canada" },
              { value: "UK", title: "United Kingdom" },
            ],
          },
        },
        type: {
          label: "Type",
          type: "select",
          valueSources: ["value"],
          fieldSettings: {
            showSearch: true,
            listValues: [
              { value: "individual", title: "Individual" },
              { value: "company", title: "Company" },
              { value: "non_profit", title: "Non-profit" },
            ],
          },
        },
        mcc: {
          label: "MCC",
          type: "select",
          valueSources: ["value"],
          fieldSettings: {
            showSearch: true,
            listValues: [
              { value: "software", title: "Software" },
              { value: "clothing", title: "Clothing" },
              { value: "industrial_supplies", title: "Industrial Supplies" },
              { value: "digital_goods", title: "Digital Goods" },
            ],
          },
        },
        annual_revenue: {
          label: "Annual Revenue",
          type: "select",
          valueSources: ["value"],
          fieldSettings: {
            showSearch: true,
            listValues: [
              { value: "less_than_250k", title: "Less than $250k" },
              { value: "250k_1m", title: "$250k to $1m" },
              { value: "1m_20m", title: "$1m to $20m" },
              { value: "20m_100m", title: "$20m to $100m" },
              { value: "more_than_100m", title: "More than $100m" },
              { value: "not_sure", title: "Not sure" },
            ],
          },
        },
        go_live_timeframe: {
          label: "Go live",
          type: "select",
          valueSources: ["value"],
          fieldSettings: {
            showSearch: true,
            listValues: [
              { value: "within_5days", title: "Within 5 days" },
              { value: "within_1month", title: "Within 1 month" },
              { value: "1_3months", title: "1-3 months" },
              { value: "3_6months", title: "3-6 months" },
              { value: "more_than_6months", title: "More than 6 months" },
              { value: "just_testing", title: "Just testing" },
            ],
          },
        },
      },
      business: {
      label: "Business",
      tooltip: "Group of fields",
      type: "!struct",
      subfields: {
        name: {
          label: "Name",
          type: "text",
          mainWidgetProps: {
            valueLabel: "Name",
            valuePlaceholder: "Enter business name",
          },
        },
        url: {
          label: "URL", //only for menu's toggler
          type: "text",
          mainWidgetProps: {
            valueLabel: "URL",
            valuePlaceholder: "Enter business URL",
          },
        },
        country: {
          label: "Country",
          type: "select",
          valueSources: ["value"],
          fieldSettings: {
            showSearch: true,
            listValues: [
              { value: "US", title: "USA" },
              { value: "CA", title: "Canada" },
              { value: "UK", title: "United Kingdom" },
            ],
          },
        },
        type: {
          label: "Type",
          type: "select",
          valueSources: ["value"],
          fieldSettings: {
            showSearch: true,
            listValues: [
              { value: "individual", title: "Individual" },
              { value: "company", title: "Company" },
              { value: "non_profit", title: "Non-profit" },
            ],
          },
        },
        mcc: {
          label: "MCC",
          type: "select",
          valueSources: ["value"],
          fieldSettings: {
            showSearch: true,
            listValues: [
              { value: "software", title: "Software" },
              { value: "clothing", title: "Clothing" },
              { value: "industrial_supplies", title: "Industrial Supplies" },
              { value: "digital_goods", title: "Digital Goods" },
            ],
          },
        },
        annual_revenue: {
          label: "Annual Revenue",
          type: "select",
          valueSources: ["value"],
          fieldSettings: {
            showSearch: true,
            listValues: [
              { value: "less_than_250k", title: "Less than $250k" },
              { value: "250k_1m", title: "$250k to $1m" },
              { value: "1m_20m", title: "$1m to $20m" },
              { value: "20m_100m", title: "$20m to $100m" },
              { value: "more_than_100m", title: "More than $100m" },
              { value: "not_sure", title: "Not sure" },
            ],
          },
        },
        go_live_timeframe: {
          label: "Go live",
          type: "select",
          valueSources: ["value"],
          fieldSettings: {
            showSearch: true,
            listValues: [
              { value: "within_5days", title: "Within 5 days" },
              { value: "within_1month", title: "Within 1 month" },
              { value: "1_3months", title: "1-3 months" },
              { value: "3_6months", title: "3-6 months" },
              { value: "more_than_6months", title: "More than 6 months" },
              { value: "just_testing", title: "Just testing" },
            ],
          },
        },
      },
    },
    user: {
      label: "User",
      tooltip: "Group of fields",
      type: "!struct",
      subfields: {
        firstName: {
          label2: "Username", //only for menu's toggler
          type: "text",
          fieldSettings: {
            validateValue: (val: string, fieldSettings) => {
              return val.length < 10;
            },
          },
          mainWidgetProps: {
            valueLabel: "Name",
            valuePlaceholder: "Enter name",
          },
        },
        login: {
          type: "text",
          tableName: "t1", // legacy: PR #18, PR #20
          fieldSettings: {
            validateValue: (val: string, fieldSettings) => {
              return (
                val.length < 10 &&
                (val === "" || val.match(/^[A-Za-z0-9_-]+$/) !== null)
              );
            },
          },
          mainWidgetProps: {
            valueLabel: "Login",
            valuePlaceholder: "Enter login",
          },
        },
      },
    },
    bio: {
      label: "Bio",
      type: "text",
      preferWidgets: ["textarea"],
      fieldSettings: {
        maxLength: 1000,
      },
    },
    results: {
      label: "Results",
      type: "!group",
      subfields: {
        product: {
          type: "select",
          fieldSettings: {
            listValues: ["abc", "def", "xyz"],
          },
          valueSources: ["value"],
        },
        score: {
          type: "number",
          fieldSettings: {
            min: 0,
            max: 100,
          },
          valueSources: ["value"],
        },
      },
    },
    cars: {
      label: "Cars",
      type: "!group",
      mode: "array",
      conjunctions: ["AND", "OR"],
      showNot: true,
      operators: [
        // w/ operand - count
        "equal",
        "not_equal",
        "less",
        "less_or_equal",
        "greater",
        "greater_or_equal",
        "between",
        "not_between",

        // w/o operand
        "some",
        "all",
        "none",
      ],
      defaultOperator: "some",
      initialEmptyWhere: true, // if default operator is not in config.settings.groupOperators, true - to set no children, false - to add 1 empty

      subfields: {
        vendor: {
          type: "select",
          fieldSettings: {
            listValues: ["Ford", "Toyota", "Tesla"],
          },
          valueSources: ["value"],
        },
        year: {
          type: "number",
          fieldSettings: {
            min: 1990,
            max: 2021,
          },
          valueSources: ["value"],
        },
      },
    },
    prox1: {
      label: "prox",
      tooltip: "Proximity search",
      type: "text",
      operators: ["proximity"],
    },
    num: {
      label: "Number",
      type: "number",
      preferWidgets: ["number"],
      fieldSettings: {
        min: -1,
        max: 5,
      },
      funcs: ["LINEAR_REGRESSION"],
    },
    slider: {
      label: "Slider",
      type: "number",
      preferWidgets: ["slider", "rangeslider"],
      valueSources: ["value", "field"],
      fieldSettings: {
        min: 0,
        max: 100,
        step: 1,
        marks: {
          0: <strong>0%</strong>,
          100: <strong>100%</strong>,
        },
        validateValue: (val, fieldSettings) => {
          return val < 50 ? null : "Invalid slider value, see validateValue()";
        },
      },
      //overrides
      widgets: {
        slider: {
          widgetProps: {
            valuePlaceholder: "..Slider",
          },
        },
        rangeslider: {
          widgetProps: {
            valueLabels: [
              { label: "Number from", placeholder: "from" },
              { label: "Number to", placeholder: "to" },
            ],
          },
        },
      },
    },
    date: {
      label: "Date",
      type: "date",
      valueSources: ["value"],
      fieldSettings: {
        dateFormat: "DD-MM-YYYY",
        validateValue: (val: string, fieldSettings: DateTimeFieldSettings) => {
          // example of date validation
          const dateVal = moment(val, fieldSettings.valueFormat);
          return dateVal.year() != new Date().getFullYear()
            ? "Please use current year"
            : null;
        },
      },
    },
    time: {
      label: "Time",
      type: "time",
      valueSources: ["value"],
      defaultOperator: "between",
    },
    datetime: {
      label: "DateTime",
      type: "datetime",
      valueSources: ["value", "func"],
    },
    datetime2: {
      label: "DateTime2",
      type: "datetime",
      valueSources: ["field"],
    },
    color: {
      label: "Color",
      type: "select",
      valueSources: ["value"],
      fieldSettings: {
        showSearch: true,
        // * old format:
        // listValues: {
        //     yellow: 'Yellow',
        //     green: 'Green',
        //     orange: 'Orange'
        // },
        // * new format:
        listValues: [
          { value: "yellow", title: "Yellow" },
          { value: "green", title: "Green" },
          { value: "orange", title: "Orange" },
        ],
      },
    },
    color2: {
      label: "Color2",
      type: "select",
      fieldSettings: {
        listValues: {
          yellow: "Yellow",
          green: "Green",
          orange: "Orange",
          purple: "Purple",
        },
      },
    },
    multicolor: {
      label: "Colors",
      type: "multiselect",
      fieldSettings: {
        showSearch: true,
        listValues: {
          yellow: "Yellow",
          green: "Green",
          orange: "Orange",
        },
        allowCustomValues: true,
      },
    },
    selecttree: {
      label: "Color (tree)",
      type: "treeselect",
      fieldSettings: {
        treeExpandAll: true,
        // * deep format (will be auto converted to flat format):
        // listValues: [
        //     { value: "1", title: "Warm colors", children: [
        //         { value: "2", title: "Red" },
        //         { value: "3", title: "Orange" }
        //     ] },
        //     { value: "4", title: "Cool colors", children: [
        //         { value: "5", title: "Green" },
        //         { value: "6", title: "Blue", children: [
        //             { value: "7", title: "Sub blue", children: [
        //                 { value: "8", title: "Sub sub blue and a long text" }
        //             ] }
        //         ] }
        //     ] }
        // ],
        // * flat format:
        listValues: [
          { value: "1", title: "Warm colors" },
          { value: "2", title: "Red", parent: "1" },
          { value: "3", title: "Orange", parent: "1" },
          { value: "4", title: "Cool colors" },
          { value: "5", title: "Green", parent: "4" },
          { value: "6", title: "Blue", parent: "4" },
          { value: "7", title: "Sub blue", parent: "6" },
          { value: "8", title: "Sub sub blue and a long text", parent: "7" },
        ],
      },
    },
    multiselecttree: {
      label: "Colors (tree)",
      type: "treemultiselect",
      fieldSettings: {
        treeExpandAll: true,
        listValues: [
          {
            value: "1",
            title: "Warm colors",
            children: [
              { value: "2", title: "Red" },
              { value: "3", title: "Orange" },
            ],
          },
          {
            value: "4",
            title: "Cool colors",
            children: [
              { value: "5", title: "Green" },
              {
                value: "6",
                title: "Blue",
                children: [
                  {
                    value: "7",
                    title: "Sub blue",
                    children: [
                      { value: "8", title: "Sub sub blue and a long text" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    autocomplete: {
      label: "Autocomplete",
      type: "select",
      valueSources: ["value"],
      fieldSettings: {
        asyncFetch: simulatedAsyncFetch,
        useAsyncSearch: true,
        useLoadMore: true,
        forceAsyncSearch: false,
        allowCustomValues: false,
      },
    },
    autocompleteMultiple: {
      label: "AutocompleteMultiple",
      type: "multiselect",
      valueSources: ["value"],
      fieldSettings: {
        asyncFetch: simulatedAsyncFetch,
        useAsyncSearch: true,
        useLoadMore: true,
        forceAsyncSearch: false,
        allowCustomValues: false,
      },
    },
    stock: {
      label: "In stock",
      type: "boolean",
      defaultValue: true,
      mainWidgetProps: {
        labelYes: "+",
        labelNo: "-",
      },
    },
  };

  //////////////////////////////////////////////////////////////////////

  const funcs: Funcs = {
    ...BasicFuncs,
  };

  const config: Config = {
    conjunctions,
    operators,
    widgets,
    types,
    settings,
    fields,
    funcs,
  };

  return config;
};
