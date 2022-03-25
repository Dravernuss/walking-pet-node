import moment from "moment";

const transform_state = (state, day, hour, time, paid) => {
  // if (!day || !hour || !state || !time)
  //   console.log("Faltan datos", day, hour, time, state);
  const initialDate = moment(`${day}T${hour}:00`);
  const endDate = initialDate.clone().add(time, "h");

  if (state === "Confirmado" && paid === true) {
    if (moment() <= initialDate) return "Confirmado";
    if (moment() > initialDate && moment() <= endDate) return "En Curso";
    if (moment() > endDate) return "Realizado";
  }

  if (state === "En Curso") {
    if (moment() > initialDate && moment() <= endDate) return "En Curso";
    if (moment() > endDate) return "Realizado";
  }

  if (paid === false && moment() >= initialDate) return "Cancelado";
  else return state;
};

export const dateMaper = (dates) => {
  const datesMapped = dates.map((date) => {
    return {
      _id: date._id,
      user_id: date.user_id,
      user_name: date.user_name,
      walker_id: date.walker_id,
      walker_name: date.walker_name,
      pets_name: date.pets_name,
      district_selected: date.district_selected,
      client_address: date.client_address,
      date_day: date.date_day,
      date_hour: date.date_hour,
      date_time: date.date_time,
      total_price: date.total_price,
      accepted: date.accepted,
      date_state: transform_state(
        date.date_state,
        date.date_day,
        date.date_hour,
        date.date_time,
        date.paid
      ),
      paid: date.paid,
      calificated: date.calificated,
    };
  });
  return datesMapped;
};
