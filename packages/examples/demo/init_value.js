export default {
  type: "group",
  id: "9b9aa99a-4567-489a-bcde-f18611c96c19",
  children1: [
    {
      type: "rule",
      id: "aab9baa8-89ab-4cde-b012-318611c96c17",
      properties: {
        field: "business.country",
        operator: "select_any_in",
        value: [["US", "CA"]],
        valueSrc: ["value"],
        valueType: ["multiselect"],
        valueError: [null],
      },
    },
    {
      type: "rule",
      id: "89b89899-4567-489a-bcde-f18611c96c17",
      properties: {
        field: "business.type",
        operator: "select_any_in",
        value: [["individual", "company"]],
        valueSrc: ["value"],
        valueType: ["multiselect"],
        valueError: [null],
      },
    },
    {
      type: "rule",
      id: "88a99a9a-0123-4456-b89a-b18611c96c17",
      properties: {
        field: "business.mcc",
        operator: "select_any_in",
        value: [["software", "digital_goods"]],
        valueSrc: ["value"],
        valueType: ["multiselect"],
        valueError: [null],
      },
    },
    {
      type: "rule",
      id: "baa98aa8-cdef-4012-b456-718611c96c17",
      properties: {
        field: "business.annual_revenue",
        operator: "select_any_in",
        value: [["less_than_250k", "250k_1m"]],
        valueSrc: ["value"],
        valueType: ["multiselect"],
        valueError: [null],
      },
    },
    {
      type: "rule",
      id: "b9ab8a99-89ab-4cde-b012-318611c96c17",
      properties: {
        field: "business.go_live_timeframe",
        operator: "select_any_in",
        value: [["within_5days", "within_1month"]],
        valueSrc: ["value"],
        valueType: ["multiselect"],
        valueError: [null],
      },
    },
    {
      type: "group",
      id: "a99b889a-89ab-4cde-b012-318611c96c18",
      children1: [
        {
          type: "rule",
          id: "9b8b8bbb-4567-489a-bcde-f18611c96c17",
          properties: {
            field: "woo_stats.is_active",
            operator: "equal",
            value: [false],
            valueSrc: ["value"],
            valueType: ["boolean"],
            valueError: [null],
          },
        },
        {
          type: "group",
          id: "b9aaa988-89ab-4cde-b012-318611c96c18",
          children1: [
            {
              type: "rule",
              id: "8bb989aa-0123-4456-b89a-b18611c96c17",
              properties: {
                field: "woo_stats.revenue.prev_30_days",
                operator: "is_not_null",
                value: [],
                valueSrc: [],
                valueType: ["number"],
                valueError: [],
              },
            },
            {
              type: "rule",
              id: "a989b8b9-cdef-4012-b456-718611c96c18",
              properties: {
                field: "woo_stats.revenue.prev_30_days",
                operator: "greater",
                value: [1000],
                valueSrc: ["value"],
                valueType: ["number"],
                valueError: [null],
              },
            },
          ],
          properties: {
            conjunction: "AND",
            not: false,
          },
        },
        {
          type: "group",
          id: "99ba888b-cdef-4012-b456-718611c96c18",
          children1: [
            {
              type: "rule",
              id: "b98a89b8-4567-489a-bcde-f18611c96c18",
              properties: {
                field: "woo_stats.revenue.prev_60_days",
                operator: "is_not_null",
                value: [],
                valueSrc: [],
                valueType: ["number"],
                valueError: [],
              },
            },
            {
              type: "rule",
              id: "a9aa9bba-0123-4456-b89a-b18611c96c18",
              properties: {
                field: "woo_stats.revenue.prev_60_days",
                operator: "greater",
                value: [3000],
                valueSrc: ["value"],
                valueType: ["number"],
                valueError: [null],
              },
            },
          ],
          properties: {
            conjunction: "AND",
            not: false,
          },
        },
      ],
      properties: {
        conjunction: "OR",
        not: false,
      },
    },
  ],
  properties: {
    conjunction: "AND",
    not: false,
  },
};
