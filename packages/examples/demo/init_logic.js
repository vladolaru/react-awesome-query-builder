export default {
  and: [
    {
      in: [
        {
          var: "business.country",
        },
        ["US", "CA"],
      ],
    },
    {
      in: [
        {
          var: "business.type",
        },
        ["individual", "company"],
      ],
    },
    {
      in: [
        {
          var: "business.mcc",
        },
        ["software", "digital_goods"],
      ],
    },
    {
      in: [
        {
          var: "business.annual_revenue",
        },
        ["less_than_250k", "250k_1m"],
      ],
    },
    {
      in: [
        {
          var: "business.go_live_timeframe",
        },
        ["within_5days", "within_1month"],
      ],
    },
    {
      or: [
        {
          "==": [
            {
              var: "woo_stats.is_active",
            },
            false,
          ],
        },
        {
          and: [
            {
              "!=": [
                {
                  var: "woo_stats.revenue.prev_30_days",
                },
                null,
              ],
            },
            {
              ">": [
                {
                  var: "woo_stats.revenue.prev_30_days",
                },
                1000,
              ],
            },
          ],
        },
        {
          and: [
            {
              "!=": [
                {
                  var: "woo_stats.revenue.prev_60_days",
                },
                null,
              ],
            },
            {
              ">": [
                {
                  var: "woo_stats.revenue.prev_60_days",
                },
                3000,
              ],
            },
          ],
        },
      ],
    },
  ],
};
