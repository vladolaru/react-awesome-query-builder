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
    },
    woo_stats: {
      label: "Woo",
      type: "!struct",
      subfields: {
        is_active: {
          label: "Active store",
          type: "boolean",
          valueSources: ["value"],
        },
        revenue: {
          label: "Revenue",
          type: "!struct",
          subfields: {
            prev_30_days: {
              label: "Previous 30 days",
              type: "number",
              valueSources: ["value"],
            },
            prev_60_days: {
              label: "Previous 60 days",
              type: "number",
              valueSources: ["value"],
            },
            prev_90_days: {
              label: "Previous 90 days",
              type: "number",
              valueSources: ["value"],
            },
          },
        },
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
