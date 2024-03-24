export const schemas: { [fileName: string]: any } = {
  Vehicle: {
    type: "object",
    properties: {
      model: {
        type: "string",
        description: "The model of the vehicle",
        example: "ABC123",
        required: true,
      },
      type: {
        type: "string",
        description: "The type of the vehicle",
        example: "sensor",
        required: true,
      },
      status: {
        type: "string",
        description: "The status of the vehicle",
        enum: ["active", "maintenance", "inactive"],
        example: "active",
        required: true,
      },
      mac_address: {
        type: "string",
        description: "The MAC address of the vehicle",
        example: "00:11:22:33:44:55",
        required: true,
      },
      speed: {
        type: "number",
        description: "The speed of the vehicle (optional)",
        example: 50,
      },
      latitude: {
        type: "string",
        description: "The latitude of the vehicle (optional)",
        example: "40.7128° N",
      },
      longitude: {
        type: "string",
        description: "The longitude of the vehicle (optional)",
        example: "74.0060° W",
      },
    },
    required: ["model", "type", "status", "mac_address"],
  },
  VehicleDetailsOutput: {
    type: "object",
    properties: {
      statusCode: {
        type: "integer",
        example: 200,
      },
      message: {
        type: "string",
        example: "success",
      },
      data: {
        type: "object",
        properties: {
          vehicle: {
            type: "object",
            properties: {
              id: {
                type: "string",
                example: "65ff71f509d0a8386fbc21ce",
              },
              model: {
                type: "string",
                example: "ABC123",
              },
              type: {
                type: "string",
                example: "sensor",
              },
              status: {
                type: "string",
                enum: ["active", "maintenance", "inactive"],
                example: "active",
              },
              mac_address: {
                type: "string",
                example: "00:11:22:33:44:55",
              },
              speed: {
                type: "number",
                example: 50,
              },
              latitude: {
                type: "string",
                example: "40.7128° N",
              },
              longitude: {
                type: "string",
                example: "74.0060° W",
              },
              maintenances: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      example: "abc123",
                      description: "The unique identifier of the item.",
                    },
                    vehicleId: {
                      type: "string",
                      example: "xyz789",
                      description:
                        "The unique identifier of the vehicle associated with the item.",
                    },
                    type: {
                      type: "string",
                      example: "maintenance",
                      description: "The type of the item.",
                    },
                    description: {
                      type: "string",
                      example: "Oil change",
                      description: "The description of the item.",
                    },
                    cost: {
                      type: "number",
                      example: 100,
                      description: "The cost of the item.",
                    },
                    date: {
                      type: "string",
                      format: "date-time",
                      example: "2024-03-25T08:00:00Z",
                      description:
                        "The date when the item was created or occurred.",
                    },
                  },
                },
              },
              usageAnalytics: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      example: "abc123",
                      description: "The unique identifier of the entry.",
                    },
                    vehicleId: {
                      type: "string",
                      example: "xyz789",
                      description:
                        "The unique identifier of the associated vehicle.",
                    },
                    date: {
                      type: "string",
                      format: "date",
                      example: "2024-03-25",
                      description: "The date of the entry.",
                    },
                    hoursOperated: {
                      type: "number",
                      example: 5.5,
                      description: "The number of hours operated.",
                    },
                    distanceTraveled: {
                      type: "number",
                      example: 100,
                      description: "The distance traveled in kilometers.",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  VehicleList: {
    type: "object",
    properties: {
      statusCode: {
        type: "integer",
        example: 200,
      },
      message: {
        type: "string",
        example: "success",
      },
      data: {
        type: "object",
        properties: {
          vehicles: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  example: "65ff7391c73718e1c28b6d6d",
                },
                model: {
                  type: "string",
                  example: "ABC123",
                },
                type: {
                  type: "string",
                  example: "sensor",
                },
                status: {
                  type: "string",
                  enum: ["active", "maintenance", "inactive"],
                  example: "active",
                },
                mac_address: {
                  type: "string",
                  example: "00:11:22:33:44:55",
                },
                speed: {
                  type: "number",
                  example: 50,
                },
                latitude: {
                  type: "string",
                  example: "40.7128° N",
                },
                longitude: {
                  type: "string",
                  example: "74.0060° W",
                },
              },
              required: ["id", "model", "type", "status", "mac_address"],
            },
          },
        },
      },
    },
    required: ["statusCode", "message", "data"],
  },
  VehicleOutput: {
    type: "object",
    properties: {
      statusCode: {
        type: "integer",
        example: 200,
      },
      message: {
        type: "string",
        example: "success",
      },
      data: {
        type: "object",
        properties: {
          vehicle: {
            type: "object",
            properties: {
              id: {
                type: "string",
                example: "65ff71f509d0a8386fbc21ce",
              },
              model: {
                type: "string",
                example: "ABC123",
              },
              type: {
                type: "string",
                example: "sensor",
              },
              status: {
                type: "string",
                enum: ["active", "maintenance", "inactive"],
                example: "active",
              },
              mac_address: {
                type: "string",
                example: "00:11:22:33:44:55",
              },
              speed: {
                type: "number",
                example: 50,
              },
              latitude: {
                type: "string",
                example: "40.7128° N",
              },
              longitude: {
                type: "string",
                example: "74.0060° W",
              },
            },
          },
        },
      },
    },
  },

  VehicleMaintenances: {
    type: "object",
    properties: {
      vehicleId: {
        type: "string",
        description: "The unique identifier of the associated vehicle.",
      },
      type: {
        type: "string",
        description: "The type of the entry.",
      },
      description: {
        type: "string",
        description: "The description of the entry.",
      },
      cost: {
        type: "number",
        description: "The cost of the entry.",
      },
      date: {
        type: "string",
        format: "date",
        description: "The date of the entry.",
      },
    },
    required: ["vehicleId", "type", "description", "cost", "date"],
  },
  VehicleMaintenancesOutput: {
    type: "object",
    properties: {
      statusCode: {
        type: "integer",
        example: 200,
      },
      message: {
        type: "string",
        example: "success",
      },
      data: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "The unique identifier of the entry.",
          },
          vehicleId: {
            type: "string",
            description: "The unique identifier of the associated vehicle.",
          },
          type: {
            type: "string",
            description: "The type of the entry.",
          },
          description: {
            type: "string",
            description: "The description of the entry.",
          },
          cost: {
            type: "number",
            description: "The cost of the entry.",
          },
          date: {
            type: "string",
            format: "date",
            description: "The date of the entry.",
          },
        },
      },
    },
  },
  VehicleMaintenancesList: {
    type: "object",
    properties: {
      statusCode: {
        type: "integer",
        example: 200,
      },
      message: {
        type: "string",
        example: "success",
      },
      data: {
        type: "object",
        properties: {
          vehicles: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  description: "The unique identifier of the entry.",
                },
                vehicleId: {
                  type: "string",
                  description:
                    "The unique identifier of the associated vehicle.",
                },
                type: {
                  type: "string",
                  description: "The type of the entry.",
                },
                description: {
                  type: "string",
                  description: "The description of the entry.",
                },
                cost: {
                  type: "number",
                  description: "The cost of the entry.",
                },
                date: {
                  type: "string",
                  format: "date",
                  description: "The date of the entry.",
                },
              },
            },
          },
        },
      },
    },
  },
  UsageAnalytics: {
    type: "object",
    properties: {
      vehicleId: {
        type: "string",
        description: "The unique identifier of the associated vehicle.",
      },
      date: {
        type: "string",
        format: "date",
        description: "The date of the entry.",
      },
      hoursOperated: {
        type: "number",
        description: "The number of hours operated.",
      },
      distanceTraveled: {
        type: "number",
        description: "The distance traveled.",
      },
    },
    required: ["vehicleId", "date", "hoursOperated", "distanceTraveled"],
  },
  UsageAnalyticsOutput: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The unique identifier of the entry.",
      },
      vehicleId: {
        type: "string",
        description: "The unique identifier of the associated vehicle.",
      },
      date: {
        type: "string",
        format: "date",
        description: "The date of the entry.",
      },
      hoursOperated: {
        type: "number",
        description: "The number of hours operated.",
      },
      distanceTraveled: {
        type: "number",
        description: "The distance traveled.",
      },
    },
  },
  UsageAnalyticsList: {
    type: "object",
    properties: {
      statusCode: {
        type: "integer",
        example: 200,
      },
      message: {
        type: "string",
        example: "success",
      },
      data: {
        type: "object",
        properties: {
          usageAnalytics: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  description: "The unique identifier of the entry.",
                },
                vehicleId: {
                  type: "string",
                  description:
                    "The unique identifier of the associated vehicle.",
                },
                date: {
                  type: "string",
                  format: "date",
                  description: "The date of the entry.",
                },
                hoursOperated: {
                  type: "number",
                  description: "The number of hours operated.",
                },
                distanceTraveled: {
                  type: "number",
                  description: "The distance traveled.",
                },
              },
            },
          },
        },
      },
    },
  },
};
