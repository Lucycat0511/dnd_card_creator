export default function SpellCard({ data }) {
  const {
    name,
    casting_time,
    range,
    components,
    material,
    duration,
    desc,
    level,
    concentration,
    school: { index },
    higher_level,
    damage,
  } = data;
  let damage_at_slot_level;
  if (damage) {
    damage_at_slot_level = damage.damage_at_slot_level;
  }
  return (
    <div className="border-2 border-black p-2 text-xs flex flex-col gap-2">
      <div className="flex">
        <h2 className="text-xl font-bold">{name}</h2>
        <div className="ml-auto flex flex-col">
          <p>
            Level {level} {index}
          </p>
          <p>{concentration}</p>
        </div>
      </div>
      <div className="border-2 border-black rounded-md">
        <div className="flex px-1 py-[0.1rem] gap-2">
          <h4>Casting Time</h4>
          <p>{casting_time}</p>
        </div>
        <hr className="border-black" />
        <div className="flex px-1 py-[0.1rem] gap-2">
          <h4>Range</h4>
          <p>{range}</p>
        </div>
        <hr className="border-black" />
        <div className="flex px-1 py-[0.1rem] gap-2">
          <h4>Components</h4>
          <p>
            {components}{" "}
            <span className="text-xs">{material && `(${material})`}</span>
          </p>
        </div>
        <hr className="border-black" />
        <div className="flex px-1 py-[0.1rem] gap-2">
          <h4>Duration</h4>
          <p>{duration}</p>
        </div>
      </div>
      <p>{desc}</p>
      <div className="mt-auto">
        {higher_level != "" && (
          <>
            <h4 className="font-semibold">At Higher Levels</h4>
            <p>{higher_level}</p>
          </>
        )}
        {damage && (
          <div className="flex border border-black w-fit">
            {damage_at_slot_level &&
              Object.entries(damage_at_slot_level).map(
                ([key, index], ind, origin) => {
                  return (
                    <div
                      key={key + index}
                      className={
                        ind != origin.length - 1 ? "border-r border-black" : ""
                      }
                    >
                      <p className="text-center">{key}</p>
                      <hr className="border-black" />
                      <p className="px-[0.35rem] text-center font-semibold">
                        {index}
                      </p>
                    </div>
                  );
                }
              )}
          </div>
        )}
      </div>
    </div>
  );
}
