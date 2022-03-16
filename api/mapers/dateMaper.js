const transform_state = (state, day, hour, time) => {};

export const dateMaper = (date) => {
  return {
    user_id: date.user_id,
    user_name: date.user_id,
    walker_id: date.user_id,
    walker_name: date.user_id,
    pets_name: date.user_id,
    district_selected: date.user_id,
    client_address: date.user_id,
    date_day: date.date_day,
    date_hour: date.date_hour,
    date_time: date.date_time,
    total_price: Number,
    accepted: { type: Number, default: 2 },
    date_state: transform_state(
      date.date_state,
      date.date_day,
      date.date_hour,
      date.date_time
    ),
    calificated: { type: Boolean, default: false },
  };
};
