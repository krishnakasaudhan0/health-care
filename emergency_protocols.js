const data={
  "meta": {
    "version": "1.0.0",
    "language": "en",
    "medical_reference": "WHO First Aid Guidelines + Red Cross Emergency Protocols",
    "disclaimer": "This protocol library is for educational and emergency guidance purposes only. Always call emergency services (112/911) immediately. This does not replace professional medical advice.",
    "emergencies_covered": ["fracture", "choking", "unconscious_person"],
    "last_updated": "2024-01"
  },

  "emergencies": {

    "fracture": {
      "id": "fracture",
      "label": "Fracture / Broken Bone",
      "aliases": ["broken bone", "fracture", "broken arm", "broken leg", "broken wrist", "snap", "bone crack", "can't move limb", "swollen limb", "deformity"],
      "severity_levels": ["simple", "compound", "spinal"],
      "call_emergency_first": true,
      "opening_statement": "I will guide you through helping someone with a fracture. Stay calm. Do not move the injured area. Call 112 or 911 now if you haven't already.",
      "triage_questions": [
        {
          "id": "fx_triage_1",
          "question": "Is the bone piercing through the skin or is there an open wound near the injury?",
          "yes_path": "compound_fracture_start",
          "no_path": "fx_triage_2"
        },
        {
          "id": "fx_triage_2",
          "question": "Did the person fall from a height, or is the injury near the neck or spine?",
          "yes_path": "spinal_fracture_start",
          "no_path": "simple_fracture_start"
        }
      ],

      "protocols": {

        "simple_fracture": {
          "id": "simple_fracture",
          "label": "Simple (Closed) Fracture",
          "description": "Bone is broken but skin is intact",
          "steps": [
            {
              "id": "sfx_1",
              "step_number": 1,
              "instruction": "Tell the person not to move. Keep them still and as comfortable as possible.",
              "detail": "Movement can worsen the break and damage surrounding nerves and blood vessels.",
              "spoken_text": "Tell the person not to move the injured area. Keep them as still as possible.",
              "next": "sfx_2"
            },
            {
              "id": "sfx_2",
              "step_number": 2,
              "instruction": "Call emergency services now if you haven't already. Tell them: location, type of injury, person's age.",
              "spoken_text": "Call 112 or 911 right now if you haven't. Give them your location and say someone has a suspected fracture.",
              "next": "sfx_3"
            },
            {
              "id": "sfx_3",
              "step_number": 3,
              "instruction": "Do NOT try to straighten the bone or push it back. Leave it exactly as it is.",
              "spoken_text": "Do not try to straighten or realign the bone. Leave the limb exactly as you find it.",
              "warning": "Attempting to realign a fracture without training can cause nerve damage and severe pain.",
              "next": "sfx_4"
            },
            {
              "id": "sfx_4",
              "step_number": 4,
              "instruction": "Immobilise the injured area using whatever is available — a rolled newspaper, stick, umbrella, or piece of wood.",
              "spoken_text": "Find something rigid nearby — a stick, rolled magazine, umbrella, or piece of wood. You will use this as a splint.",
              "next": "sfx_5"
            },
            {
              "id": "sfx_5",
              "step_number": 5,
              "instruction": "Place the splint alongside the limb — NOT underneath it. It should extend beyond the joints above and below the fracture.",
              "spoken_text": "Place the rigid object alongside the injured limb. It must extend beyond the joints on both sides of the fracture.",
              "next": "sfx_6"
            },
            {
              "id": "sfx_6",
              "step_number": 6,
              "instruction": "Secure the splint using strips of cloth, a belt, or a bandage. Tie above AND below the fracture site — not directly on it.",
              "spoken_text": "Tie the splint to the limb using cloth strips or a belt. Tie above and below the fracture. Not directly on the injury.",
              "next": "sfx_7"
            },
            {
              "id": "sfx_7",
              "step_number": 7,
              "instruction": "Check circulation: press the fingernail or toenail on the injured side. It should turn white then pink within 2 seconds.",
              "spoken_text": "Press the fingernail or toenail on the injured side. Release it. It should go white, then turn pink again within 2 seconds. This confirms blood is flowing.",
              "branch": {
                "question": "Did the colour return to pink within 2 seconds?",
                "yes_path": "sfx_8",
                "no_path": "sfx_circulation_problem"
              }
            },
            {
              "id": "sfx_circulation_problem",
              "step_number": "7b",
              "instruction": "Circulation may be compromised. Loosen the splint ties slightly. Do not remove the splint. Tell emergency services immediately.",
              "spoken_text": "The circulation may be cut off. Loosen the ties on the splint slightly. Do not remove it. Inform the emergency operator immediately.",
              "warning": "Poor circulation after splinting means the ties are too tight.",
              "next": "sfx_8"
            },
            {
              "id": "sfx_8",
              "step_number": 8,
              "instruction": "Apply ice or a cold pack wrapped in cloth to the injury site to reduce swelling. Do NOT apply ice directly to skin.",
              "spoken_text": "If ice is available, wrap it in a cloth and gently place it on the injury. Do not put ice directly on the skin.",
              "next": "sfx_9"
            },
            {
              "id": "sfx_9",
              "step_number": 9,
              "instruction": "Elevate the injured limb above heart level if possible — rest it on a folded cloth or bag.",
              "spoken_text": "Gently raise the injured limb above the level of the heart if possible. Support it with a folded cloth or bag underneath.",
              "next": "sfx_10"
            },
            {
              "id": "sfx_10",
              "step_number": 10,
              "instruction": "Keep the person warm and calm. Talk to them. Do NOT give food, water, or painkillers — surgery may be needed.",
              "spoken_text": "Keep the person warm. Talk to them calmly. Do not give them food, water, or any medication. They may need surgery.",
              "next": "sfx_11"
            },
            {
              "id": "sfx_11",
              "step_number": 11,
              "instruction": "Monitor breathing and consciousness every 2 minutes until help arrives.",
              "spoken_text": "Check that the person is breathing normally and remains conscious every 2 minutes. Stay with them until help arrives.",
              "branch": {
                "question": "Has the person lost consciousness or stopped breathing normally?",
                "yes_path": "sfx_unconscious_redirect",
                "no_path": "sfx_wait"
              }
            },
            {
              "id": "sfx_unconscious_redirect",
              "step_number": "11b",
              "instruction": "The person has lost consciousness. Switch to the Unconscious Person protocol immediately.",
              "spoken_text": "The person has become unconscious. We are switching to the unconscious person protocol now.",
              "redirect_to": "unconscious_person"
            },
            {
              "id": "sfx_wait",
              "step_number": 12,
              "instruction": "Continue monitoring. Help is on the way. You are doing the right thing.",
              "spoken_text": "You are doing well. Keep monitoring the person. Stay calm. Emergency services are on their way.",
              "is_terminal": true
            }
          ]
        },

        "compound_fracture": {
          "id": "compound_fracture",
          "label": "Compound (Open) Fracture",
          "description": "Bone is visible through the skin or there is a deep wound near the fracture",
          "steps": [
            {
              "id": "cfx_1",
              "step_number": 1,
              "instruction": "Call 112/911 IMMEDIATELY. This is a medical emergency. Do not delay.",
              "spoken_text": "This is a serious injury. Call 112 or 911 immediately if not already done.",
              "next": "cfx_2",
              "priority": "critical"
            },
            {
              "id": "cfx_2",
              "step_number": 2,
              "instruction": "Do NOT touch, push, or cover the exposed bone. Do not try to push it back in.",
              "spoken_text": "Do not touch or push the bone. Do not try to push it back in. Leave it exactly as it is.",
              "warning": "Touching the exposed bone introduces infection risk and can cause severe damage.",
              "next": "cfx_3"
            },
            {
              "id": "cfx_3",
              "step_number": 3,
              "instruction": "Control bleeding around the wound — but NOT over the bone. Press firmly with a clean cloth on the skin around the wound.",
              "spoken_text": "Use a clean cloth to press firmly on the skin around the wound — not directly on the bone. Control the bleeding from the edges.",
              "next": "cfx_4"
            },
            {
              "id": "cfx_4",
              "step_number": 4,
              "instruction": "Build a ring bandage: roll cloth into a donut shape and place it around the bone so the bone sits inside the hole. This protects the bone without touching it.",
              "spoken_text": "Roll a cloth into a ring shape — like a donut. Place this ring around the exposed bone so the bone sits in the hole. This protects it without pressure.",
              "next": "cfx_5"
            },
            {
              "id": "cfx_5",
              "step_number": 5,
              "instruction": "Cover the ring and wound loosely with a clean cloth or bandage. Do not press down on the bone area.",
              "spoken_text": "Drape a clean cloth loosely over the wound and ring. Do not press down. Just cover it gently.",
              "next": "cfx_6"
            },
            {
              "id": "cfx_6",
              "step_number": 6,
              "instruction": "Immobilise the limb in the position you found it. Do NOT apply a splint if the bone is exposed.",
              "spoken_text": "Keep the limb completely still in the position you found it. Do not apply a splint over an exposed bone.",
              "next": "cfx_7"
            },
            {
              "id": "cfx_7",
              "step_number": 7,
              "instruction": "Keep the person lying down. Elevate legs slightly (unless this causes pain) to prevent shock.",
              "spoken_text": "Help the person lie down. If it does not cause pain, gently raise their legs slightly to prevent shock.",
              "next": "cfx_8"
            },
            {
              "id": "cfx_8",
              "step_number": 8,
              "instruction": "Cover the person with a blanket or jacket to keep them warm. Shock can set in quickly.",
              "spoken_text": "Cover the person with a blanket or jacket. Keep them warm. Shock can happen quickly with this type of injury.",
              "next": "cfx_9"
            },
            {
              "id": "cfx_9",
              "step_number": 9,
              "instruction": "Do NOT give food, water, or any medication. Monitor breathing every 2 minutes.",
              "spoken_text": "Do not give anything to eat or drink. Check their breathing every 2 minutes until help arrives.",
              "next": "cfx_10"
            },
            {
              "id": "cfx_10",
              "step_number": 10,
              "instruction": "Talk to the person constantly. Tell them help is coming. Your voice keeps them calm and conscious.",
              "spoken_text": "Keep talking to the person. Tell them they are safe and help is coming. Your voice is important right now.",
              "is_terminal": true
            }
          ]
        },

        "spinal_fracture": {
          "id": "spinal_fracture",
          "label": "Suspected Spinal / Neck Fracture",
          "description": "Injury near neck or spine, or person fell from height",
          "steps": [
            {
              "id": "spfx_1",
              "step_number": 1,
              "instruction": "DO NOT move the person under any circumstances unless there is an immediate life-threatening danger (fire, flood).",
              "spoken_text": "Do not move the person at all. Any movement can cause permanent paralysis. Keep them completely still.",
              "priority": "critical",
              "next": "spfx_2"
            },
            {
              "id": "spfx_2",
              "step_number": 2,
              "instruction": "Call 112/911 immediately. Tell them: suspected spinal injury, exact location.",
              "spoken_text": "Call 112 or 911 immediately. Tell them you suspect a spinal injury and give your exact location.",
              "next": "spfx_3"
            },
            {
              "id": "spfx_3",
              "step_number": 3,
              "instruction": "Kneel behind the person's head. Place your hands on both sides of their head to hold it still — but do NOT apply pressure.",
              "spoken_text": "Kneel directly behind the person's head. Place your hands on both sides of their head gently. Hold it completely still without pressing.",
              "next": "spfx_4"
            },
            {
              "id": "spfx_4",
              "step_number": 4,
              "instruction": "Keep their head in the position you found it — aligned with the spine. Do not tilt, twist, or rotate it.",
              "spoken_text": "Keep the head exactly as you found it. Do not tilt it back or to the side. Keep it aligned with the rest of the body.",
              "next": "spfx_5"
            },
            {
              "id": "spfx_5",
              "step_number": 5,
              "instruction": "Ask the person: Can you feel your hands and feet? Can you move your fingers?",
              "spoken_text": "Ask the person: Can you feel your hands and feet? Can you wiggle your fingers or toes?",
              "branch": {
                "question": "Did the person say they cannot feel or move their hands or feet?",
                "yes_path": "spfx_neuro_signs",
                "no_path": "spfx_6"
              }
            },
            {
              "id": "spfx_neuro_signs",
              "step_number": "5b",
              "instruction": "Loss of sensation or movement is a serious sign. Tell emergency services immediately. Do NOT move the person.",
              "spoken_text": "Loss of feeling or movement is very serious. Tell the emergency operator immediately. Continue holding the head still.",
              "priority": "critical",
              "next": "spfx_6"
            },
            {
              "id": "spfx_6",
              "step_number": 6,
              "instruction": "If the person is unconscious but breathing, maintain head position. Do not move them to recovery position.",
              "spoken_text": "If they are unconscious but breathing, keep holding their head still. Do not put them into the recovery position — that requires movement.",
              "branch": {
                "question": "Has the person stopped breathing?",
                "yes_path": "spfx_cpr_conflict",
                "no_path": "spfx_7"
              }
            },
            {
              "id": "spfx_cpr_conflict",
              "step_number": "6b",
              "instruction": "If the person has stopped breathing, you must begin CPR even with a spinal injury — life takes priority. Minimise head movement as much as possible during CPR.",
              "spoken_text": "If the person is not breathing, you must start CPR. Life comes before spinal precautions. Try to keep the head as still as possible while performing CPR.",
              "redirect_to": "unconscious_person",
              "next": "spfx_7"
            },
            {
              "id": "spfx_7",
              "step_number": 7,
              "instruction": "Hold the position until paramedics arrive. Do not let go of the head even if your arms tire. Ask a bystander to take over if needed — transfer hands carefully.",
              "spoken_text": "Keep holding the head still until paramedics arrive. If your arms are tired, ask someone else to take over — transfer your hands carefully without moving the head.",
              "next": "spfx_8"
            },
            {
              "id": "spfx_8",
              "step_number": 8,
              "instruction": "Talk to the person to keep them calm and conscious. Tell them not to move their head.",
              "spoken_text": "Keep talking to the person. Tell them not to move. Tell them help is very close.",
              "is_terminal": true
            }
          ]
        }
      }
    },

    "choking": {
      "id": "choking",
      "label": "Choking",
      "aliases": ["choking", "can't breathe", "something stuck in throat", "blocked airway", "not breathing", "turning blue", "hands on throat", "coughing hard", "swallowed something"],
      "severity_levels": ["mild", "severe", "infant", "pregnant", "unconscious_choking"],
      "call_emergency_first": false,
      "opening_statement": "Someone is choking. Act fast but stay calm. I will guide you step by step. First — is the person able to cough or speak at all?",
      "triage_questions": [
        {
          "id": "ch_triage_1",
          "question": "Is the person coughing forcefully or able to speak or cry?",
          "yes_path": "mild_choking_start",
          "no_path": "ch_triage_2"
        },
        {
          "id": "ch_triage_2",
          "question": "Is the victim an infant — younger than 1 year old?",
          "yes_path": "infant_choking_start",
          "no_path": "ch_triage_3"
        },
        {
          "id": "ch_triage_3",
          "question": "Is the victim visibly pregnant or very obese?",
          "yes_path": "pregnant_choking_start",
          "no_path": "ch_triage_4"
        },
        {
          "id": "ch_triage_4",
          "question": "Is the person conscious and standing or sitting?",
          "yes_path": "severe_choking_start",
          "no_path": "unconscious_choking_start"
        }
      ],

      "protocols": {

        "mild_choking": {
          "id": "mild_choking",
          "label": "Mild Choking — Partial Airway Obstruction",
          "description": "Person can still cough, speak, or cry",
          "steps": [
            {
              "id": "mch_1",
              "step_number": 1,
              "instruction": "Encourage the person to keep coughing. Coughing is the most effective way to clear an airway. Do NOT slap their back yet.",
              "spoken_text": "Tell the person to keep coughing hard. Coughing is the best thing they can do right now. Do not stop them.",
              "next": "mch_2"
            },
            {
              "id": "mch_2",
              "step_number": 2,
              "instruction": "Do NOT give water. Do NOT tip them upside down. Do NOT put your finger in their mouth to sweep.",
              "spoken_text": "Do not give them water. Do not tilt them upside down. Do not put your fingers in their mouth.",
              "next": "mch_3"
            },
            {
              "id": "mch_3",
              "step_number": 3,
              "instruction": "Stay close and watch. If the coughing becomes silent or they cannot breathe, move immediately to severe choking protocol.",
              "spoken_text": "Stay close and watch carefully. If the cough becomes silent or they stop breathing, tell me immediately.",
              "branch": {
                "question": "Has the coughing become silent or has the person stopped being able to breathe or speak?",
                "yes_path": "severe_choking_start",
                "no_path": "mch_4"
              }
            },
            {
              "id": "mch_4",
              "step_number": 4,
              "instruction": "If coughing clears the object and the person is breathing normally — let them rest. Encourage slow, deep breaths.",
              "spoken_text": "If the object has been cleared and they are breathing normally, let them sit and rest. Encourage slow deep breaths.",
              "next": "mch_5"
            },
            {
              "id": "mch_5",
              "step_number": 5,
              "instruction": "Even after clearing, recommend the person sees a doctor — irritation or small fragments may remain.",
              "spoken_text": "Even if they feel fine now, advise them to see a doctor. Small fragments may still be present or the airway may be irritated.",
              "is_terminal": true
            }
          ]
        },

        "severe_choking": {
          "id": "severe_choking",
          "label": "Severe Choking — Complete Airway Obstruction",
          "description": "Person cannot cough, speak, or breathe. May be holding throat.",
          "steps": [
            {
              "id": "sch_1",
              "step_number": 1,
              "instruction": "Shout for help. Tell someone to call 112/911 right now while you act.",
              "spoken_text": "Shout for help immediately. Tell someone nearby to call 112 or 911 while you help the person.",
              "next": "sch_2",
              "priority": "critical"
            },
            {
              "id": "sch_2",
              "step_number": 2,
              "instruction": "Stand slightly behind and to the side of the person. Support their chest with one hand. Lean them forward so their head is lower than their chest.",
              "spoken_text": "Stand slightly behind them. Support their chest with one hand. Lean them forward so their head is lower than their chest.",
              "next": "sch_3"
            },
            {
              "id": "sch_3",
              "step_number": 3,
              "instruction": "Give 5 firm back blows with the heel of your hand — between the shoulder blades. Each blow should be a separate, sharp strike.",
              "spoken_text": "Use the heel of your hand to give 5 firm blows between their shoulder blades. Strike hard and separate — one at a time.",
              "next": "sch_4"
            },
            {
              "id": "sch_4",
              "step_number": 4,
              "instruction": "Check after each blow — has the object been dislodged? Can they breathe or cough now?",
              "spoken_text": "Check after each blow. Has anything come out? Can they breathe or speak now?",
              "branch": {
                "question": "Has the object been cleared — can they breathe or cough now?",
                "yes_path": "sch_cleared",
                "no_path": "sch_5"
              }
            },
            {
              "id": "sch_cleared",
              "step_number": "4b",
              "instruction": "The airway is clear. Let the person rest. Monitor breathing. Encourage slow deep breaths. Seek medical attention.",
              "spoken_text": "The object has been cleared. Let them sit and rest. Watch their breathing. Encourage slow deep breaths. They should still see a doctor.",
              "is_terminal": true
            },
            {
              "id": "sch_5",
              "step_number": 5,
              "instruction": "Move to abdominal thrusts (Heimlich manoeuvre). Stand behind the person. Place one foot forward for stability.",
              "spoken_text": "Move to abdominal thrusts. Stand directly behind the person. Place one foot forward between their feet for balance.",
              "next": "sch_6"
            },
            {
              "id": "sch_6",
              "step_number": 6,
              "instruction": "Make a fist with one hand. Place the thumb side of your fist just above the navel and well below the breastbone.",
              "spoken_text": "Make a fist. Place the thumb side against their belly — just above the navel, well below the end of the breastbone.",
              "next": "sch_7"
            },
            {
              "id": "sch_7",
              "step_number": 7,
              "instruction": "Grasp your fist with your other hand. Give 5 quick, firm upward thrusts — pulling inward and upward sharply.",
              "spoken_text": "Wrap your other hand around your fist. Give 5 quick sharp thrusts — pull hard inward and upward each time.",
              "next": "sch_8"
            },
            {
              "id": "sch_8",
              "step_number": 8,
              "instruction": "Alternate: 5 back blows then 5 abdominal thrusts. Repeat this cycle until the object is expelled or the person loses consciousness.",
              "spoken_text": "Keep alternating — 5 back blows, then 5 abdominal thrusts. Repeat until the object comes out or the person collapses.",
              "branch": {
                "question": "Has the person lost consciousness or collapsed?",
                "yes_path": "unconscious_choking_start",
                "no_path": "sch_8"
              }
            }
          ]
        },

        "infant_choking": {
          "id": "infant_choking",
          "label": "Infant Choking (Under 1 Year)",
          "description": "Special protocol — never use Heimlich on infants",
          "steps": [
            {
              "id": "ich_1",
              "step_number": 1,
              "instruction": "Call 112/911 immediately or have someone call while you act.",
              "spoken_text": "Call 112 or 911 immediately. Have someone else call while you help the baby.",
              "next": "ich_2",
              "priority": "critical"
            },
            {
              "id": "ich_2",
              "step_number": 2,
              "instruction": "Lay the infant face DOWN on your forearm. Support the head. Keep the head lower than the chest.",
              "spoken_text": "Hold the baby face down on your forearm. Support the head with your hand. The head must be lower than the chest.",
              "next": "ich_3"
            },
            {
              "id": "ich_3",
              "step_number": 3,
              "instruction": "Give 5 back blows between the shoulder blades using the heel of your hand. Use less force than for adults — firm but gentle.",
              "spoken_text": "Give 5 firm but gentle blows between the baby's shoulder blades using the heel of your hand.",
              "next": "ich_4"
            },
            {
              "id": "ich_4",
              "step_number": 4,
              "instruction": "Turn the infant face UP on your other arm, supporting the head. Keep the head lower than the body.",
              "spoken_text": "Turn the baby face up on your other arm. Keep supporting the head. Keep the head lower than the body.",
              "next": "ich_5"
            },
            {
              "id": "ich_5",
              "step_number": 5,
              "instruction": "Give 5 chest thrusts — place 2 fingers on the centre of the chest, just below the nipple line. Press down about 4cm (1.5 inches). Release fully between each thrust.",
              "spoken_text": "Place 2 fingers on the centre of the baby's chest just below the nipple line. Push down about 4 centimetres. Do this 5 times.",
              "next": "ich_6"
            },
            {
              "id": "ich_6",
              "step_number": 6,
              "instruction": "Look in the mouth. Only remove an object if you can clearly see it — do NOT do a blind finger sweep.",
              "spoken_text": "Look carefully in the baby's mouth. If you can see an object clearly, remove it. Do not put your finger in blindly — you may push it deeper.",
              "next": "ich_7"
            },
            {
              "id": "ich_7",
              "step_number": 7,
              "instruction": "Repeat the cycle: 5 back blows, then 5 chest thrusts. Continue until the object is removed or emergency services arrive.",
              "spoken_text": "Keep repeating — 5 back blows, then 5 chest thrusts. Do not stop until the object comes out or help arrives.",
              "branch": {
                "question": "Has the baby stopped breathing or become unresponsive?",
                "yes_path": "ich_cpr",
                "no_path": "ich_7"
              }
            },
            {
              "id": "ich_cpr",
              "step_number": "7b",
              "instruction": "The infant is unresponsive. Begin infant CPR immediately.",
              "spoken_text": "The baby is unresponsive. Begin infant CPR immediately.",
              "redirect_to": "unconscious_person",
              "next_subtype": "infant_cpr"
            }
          ]
        },

        "pregnant_choking": {
          "id": "pregnant_choking",
          "label": "Choking in Pregnant or Obese Person",
          "description": "Abdominal thrusts are replaced with chest thrusts",
          "steps": [
            {
              "id": "pch_1",
              "step_number": 1,
              "instruction": "Call 112/911 immediately.",
              "spoken_text": "Call 112 or 911 now.",
              "next": "pch_2",
              "priority": "critical"
            },
            {
              "id": "pch_2",
              "step_number": 2,
              "instruction": "Give 5 back blows — lean the person forward, support their chest, and strike firmly between the shoulder blades.",
              "spoken_text": "Lean the person forward, support their chest, and give 5 firm blows between the shoulder blades.",
              "next": "pch_3"
            },
            {
              "id": "pch_3",
              "step_number": 3,
              "instruction": "If back blows do not work, switch to chest thrusts. Stand behind the person. Place your arms under their armpits and around the chest.",
              "spoken_text": "If the back blows haven't worked, move to chest thrusts. Stand behind them. Pass your arms under their armpits around their chest.",
              "next": "pch_4"
            },
            {
              "id": "pch_4",
              "step_number": 4,
              "instruction": "Make a fist. Place it on the centre of the breastbone (sternum) — NOT on the belly. Grip with your other hand.",
              "spoken_text": "Make a fist and place it on the centre of the breastbone. Not on the belly. Grip it with your other hand.",
              "next": "pch_5"
            },
            {
              "id": "pch_5",
              "step_number": 5,
              "instruction": "Give 5 sharp backward thrusts — press firmly backward into the centre of the chest.",
              "spoken_text": "Give 5 sharp firm thrusts backward into the chest. Each thrust should be a strong separate motion.",
              "next": "pch_6"
            },
            {
              "id": "pch_6",
              "step_number": 6,
              "instruction": "Alternate 5 back blows and 5 chest thrusts until the obstruction clears or the person loses consciousness.",
              "spoken_text": "Keep alternating — 5 back blows, then 5 chest thrusts — until the blockage clears or they collapse.",
              "branch": {
                "question": "Has the person collapsed or lost consciousness?",
                "yes_path": "unconscious_choking_start",
                "no_path": "pch_6"
              }
            }
          ]
        },

        "unconscious_choking": {
          "id": "unconscious_choking",
          "label": "Choking — Person Has Collapsed or Is Unconscious",
          "description": "Object still in airway, person is unresponsive",
          "steps": [
            {
              "id": "uch_1",
              "step_number": 1,
              "instruction": "Lower the person carefully to the ground. Lay them on their back on a firm, flat surface.",
              "spoken_text": "Lower the person gently to the ground. Lay them flat on their back on a firm surface.",
              "next": "uch_2"
            },
            {
              "id": "uch_2",
              "step_number": 2,
              "instruction": "Call 112/911 immediately if not already done.",
              "spoken_text": "Call 112 or 911 immediately if not already done.",
              "next": "uch_3"
            },
            {
              "id": "uch_3",
              "step_number": 3,
              "instruction": "Tilt the head back gently and lift the chin to open the airway. Look in the mouth — if you can see the object clearly, remove it with your fingers.",
              "spoken_text": "Tilt the head back gently and lift the chin. Look in the mouth. If you can see the object, remove it carefully.",
              "next": "uch_4"
            },
            {
              "id": "uch_4",
              "step_number": 4,
              "instruction": "Attempt 2 rescue breaths — tilt head back, seal your mouth over theirs, breathe in steadily for 1 second each. Watch for chest rise.",
              "spoken_text": "Tilt the head back. Seal your mouth over theirs completely. Give 2 steady breaths — one second each. Watch if the chest rises.",
              "branch": {
                "question": "Did the chest rise with the rescue breaths?",
                "yes_path": "uch_breaths_worked",
                "no_path": "uch_5"
              }
            },
            {
              "id": "uch_breaths_worked",
              "step_number": "4b",
              "instruction": "Air is getting in. Continue rescue breathing and check for a pulse. Transition to unconscious person protocol.",
              "spoken_text": "Air is getting in. Continue rescue breathing. Check for a pulse. Transition to the unconscious person protocol.",
              "redirect_to": "unconscious_person"
            },
            {
              "id": "uch_5",
              "step_number": 5,
              "instruction": "Begin chest compressions — the force may help expel the object. Place the heel of your hand on the centre of the chest. Give 30 compressions at 100–120 per minute.",
              "spoken_text": "Begin chest compressions. Place the heel of your hand on the centre of the chest. Push down hard and fast — 30 times. This may help push the object out.",
              "next": "uch_6"
            },
            {
              "id": "uch_6",
              "step_number": 6,
              "instruction": "After every 30 compressions, check the mouth. If you can see the object, remove it. Then attempt 2 rescue breaths.",
              "spoken_text": "After 30 compressions, check the mouth. If you see the object, remove it. Then try 2 rescue breaths.",
              "next": "uch_7"
            },
            {
              "id": "uch_7",
              "step_number": 7,
              "instruction": "Continue the cycle: 30 compressions → check mouth → 2 rescue breaths. Do not stop until the airway clears or emergency services arrive.",
              "spoken_text": "Keep going: 30 compressions, check the mouth, 2 rescue breaths. Do not stop until help arrives.",
              "is_terminal": true
            }
          ]
        }
      }
    },

    "unconscious_person": {
      "id": "unconscious_person",
      "label": "Unconscious Person",
      "aliases": ["unconscious", "fainted", "collapsed", "passed out", "not responding", "won't wake up", "fell down", "unresponsive", "not moving"],
      "severity_levels": ["responsive", "breathing", "not_breathing", "infant_cpr"],
      "call_emergency_first": true,
      "opening_statement": "Someone is unconscious. Stay calm. I will guide you through this. First — call 112 or 911 right now if you haven't already.",
      "triage_questions": [
        {
          "id": "uc_triage_1",
          "question": "Is the person a baby or infant — under 1 year old?",
          "yes_path": "infant_cpr_start",
          "no_path": "uc_triage_2"
        },
        {
          "id": "uc_triage_2",
          "question": "Is the person a child — between 1 and 8 years old?",
          "yes_path": "child_cpr_start",
          "no_path": "uc_triage_3"
        },
        {
          "id": "uc_triage_3",
          "question": "Tap the person's shoulders firmly and shout their name. Do they respond at all?",
          "yes_path": "responsive_unconscious_start",
          "no_path": "uc_triage_4"
        },
        {
          "id": "uc_triage_4",
          "question": "Tilt the head back and look, listen, and feel for normal breathing for 10 seconds. Are they breathing normally?",
          "yes_path": "unconscious_breathing_start",
          "no_path": "not_breathing_start"
        }
      ],

      "protocols": {

        "responsive_unconscious": {
          "id": "responsive_unconscious",
          "label": "Unconscious but Responding",
          "description": "Person responds to stimulus but cannot maintain consciousness",
          "steps": [
            {
              "id": "ruc_1",
              "step_number": 1,
              "instruction": "Call 112/911 if not already done. A responsive but confused person still needs emergency assessment.",
              "spoken_text": "Call 112 or 911 if not done. Even if the person is responding, they need medical assessment.",
              "next": "ruc_2"
            },
            {
              "id": "ruc_2",
              "step_number": 2,
              "instruction": "Keep the person still. Do not offer water or food. Ask simple questions: What is your name? Where does it hurt?",
              "spoken_text": "Keep them still. Do not give food or water. Ask: What is your name? Where does it hurt?",
              "next": "ruc_3"
            },
            {
              "id": "ruc_3",
              "step_number": 3,
              "instruction": "Check for obvious injuries: bleeding, deformity, burns. Do not move them if you suspect a neck or spine injury.",
              "spoken_text": "Look for obvious injuries — bleeding, deformity, burns. Do not move them if the neck or spine may be hurt.",
              "next": "ruc_4"
            },
            {
              "id": "ruc_4",
              "step_number": 4,
              "instruction": "Monitor their level of consciousness every minute. Use the AVPU scale: Alert → Voice → Pain → Unresponsive.",
              "spoken_text": "Check their consciousness every minute. Can they speak? Do they respond to your voice? Keep monitoring until help arrives.",
              "branch": {
                "question": "Has the person become fully unresponsive — no response to voice or touch?",
                "yes_path": "not_breathing_start",
                "no_path": "ruc_5"
              }
            },
            {
              "id": "ruc_5",
              "step_number": 5,
              "instruction": "If they remain conscious and there is no spinal risk, place in recovery position if they vomit.",
              "spoken_text": "If they are still responsive and there is no spinal injury risk, be ready to place them in the recovery position if they vomit.",
              "is_terminal": true
            }
          ]
        },

        "unconscious_breathing": {
          "id": "unconscious_breathing",
          "label": "Unconscious but Breathing",
          "description": "Person is unresponsive but has normal breathing — Recovery Position",
          "steps": [
            {
              "id": "ucb_1",
              "step_number": 1,
              "instruction": "Call 112/911 immediately.",
              "spoken_text": "Call 112 or 911 immediately.",
              "next": "ucb_2",
              "priority": "critical"
            },
            {
              "id": "ucb_2",
              "step_number": 2,
              "instruction": "Do NOT leave them on their back — if they vomit they can choke. Place them in the recovery position. Kneel beside them.",
              "spoken_text": "Do not leave them lying on their back. We need to put them in the recovery position to protect the airway. Kneel beside them.",
              "next": "ucb_3"
            },
            {
              "id": "ucb_3",
              "step_number": 3,
              "instruction": "Extend the arm nearest to you at a right angle to their body, elbow bent, palm facing up.",
              "spoken_text": "Take the arm closest to you. Extend it out at a right angle. Bend the elbow so the palm faces upward.",
              "next": "ucb_4"
            },
            {
              "id": "ucb_4",
              "step_number": 4,
              "instruction": "Bring their far arm across their chest. Hold the back of their hand against their nearest cheek.",
              "spoken_text": "Bring their far arm across the chest. Hold the back of that hand against their near cheek and keep it there.",
              "next": "ucb_5"
            },
            {
              "id": "ucb_5",
              "step_number": 5,
              "instruction": "With your other hand, pull up the far knee so the foot is flat on the ground.",
              "spoken_text": "With your other hand, pull up the far knee until the foot is flat on the floor.",
              "next": "ucb_6"
            },
            {
              "id": "ucb_6",
              "step_number": 6,
              "instruction": "Roll the person onto their side toward you — using the bent knee as a lever. Their hand should stay under their cheek.",
              "spoken_text": "Roll them toward you onto their side using the bent knee as a lever. The hand should cushion their cheek.",
              "next": "ucb_7"
            },
            {
              "id": "ucb_7",
              "step_number": 7,
              "instruction": "Tilt their head back slightly to keep the airway open. Adjust the top knee so the hip and knee are at right angles.",
              "spoken_text": "Tilt the head back gently to keep the airway open. Adjust the upper knee so the hip and knee form right angles.",
              "next": "ucb_8"
            },
            {
              "id": "ucb_8",
              "step_number": 8,
              "instruction": "Check breathing every minute. If they stop breathing normally at any point — start CPR immediately.",
              "spoken_text": "Check breathing every minute. If at any point they stop breathing normally, start CPR immediately.",
              "branch": {
                "question": "Has the person stopped breathing or is breathing becoming abnormal — gasping or very slow?",
                "yes_path": "not_breathing_start",
                "no_path": "ucb_9"
              }
            },
            {
              "id": "ucb_9",
              "step_number": 9,
              "instruction": "If you must leave to get help, turn them onto their back first only if alone and absolutely necessary. Return immediately.",
              "spoken_text": "Stay with them until help arrives. If you must go, return as quickly as possible. Keep monitoring their breathing.",
              "is_terminal": true
            }
          ]
        },

        "not_breathing": {
          "id": "not_breathing",
          "label": "Unconscious and Not Breathing — Adult CPR",
          "description": "Full CPR protocol for adults (age 8+)",
          "steps": [
            {
              "id": "cpr_1",
              "step_number": 1,
              "instruction": "Call 112/911 NOW. Put them on speaker. The operator will stay on the line.",
              "spoken_text": "Call 112 or 911 right now. Put it on speaker. The operator will guide you too.",
              "next": "cpr_2",
              "priority": "critical"
            },
            {
              "id": "cpr_2",
              "step_number": 2,
              "instruction": "Lay the person on their back on a hard, flat surface. Kneel beside them.",
              "spoken_text": "Lay them flat on their back on a hard surface. Kneel beside their chest.",
              "next": "cpr_3"
            },
            {
              "id": "cpr_3",
              "step_number": 3,
              "instruction": "Place the heel of your hand on the centre of their chest — on the lower half of the breastbone. Place your second hand on top. Interlock fingers.",
              "spoken_text": "Place the heel of your hand on the centre of their chest. Put your other hand on top and interlock your fingers.",
              "next": "cpr_4"
            },
            {
              "id": "cpr_4",
              "step_number": 4,
              "instruction": "Keep your arms straight. Position your shoulders directly above your hands. You must compress the chest — not just push with your arms.",
              "spoken_text": "Keep your arms straight. Your shoulders should be directly above your hands. You are going to push the chest down using your body weight.",
              "next": "cpr_5"
            },
            {
              "id": "cpr_5",
              "step_number": 5,
              "instruction": "Compress the chest downward by at least 5cm (2 inches). Release fully. Repeat at a rate of 100–120 compressions per minute — this is fast.",
              "spoken_text": "Push the chest down firmly — at least 5 centimetres. Let it rise fully. Repeat fast — about 2 compressions every second. Think of the beat of the song Stayin Alive.",
              "next": "cpr_6",
              "tip": "Counting out loud helps maintain rhythm: 1-and-2-and-3-and..."
            },
            {
              "id": "cpr_6",
              "step_number": 6,
              "instruction": "After 30 compressions, give 2 rescue breaths if you are trained and willing. If not, continue compressions only — hands-only CPR still saves lives.",
              "spoken_text": "After 30 compressions, you can give 2 rescue breaths. Tilt the head back, lift the chin, seal your mouth over theirs, and breathe in steadily. If you are not comfortable doing this, continue compressions only — this still saves lives.",
              "branch": {
                "question": "Are you performing rescue breaths or compressions-only CPR?",
                "rescue_breaths_path": "cpr_rescue_breaths",
                "compressions_only_path": "cpr_compressions_only"
              }
            },
            {
              "id": "cpr_rescue_breaths",
              "step_number": "6a",
              "instruction": "Tilt head back, lift chin. Pinch nose. Seal lips around mouth. Give 1 breath over 1 second — watch for chest rise. Give 2 breaths then return to 30 compressions.",
              "spoken_text": "Tilt head back. Lift the chin. Pinch the nose shut. Seal your lips around their mouth. Give 1 steady breath over 1 second. Watch the chest rise. Give 2 breaths, then go back to 30 compressions.",
              "next": "cpr_cycle"
            },
            {
              "id": "cpr_compressions_only",
              "step_number": "6b",
              "instruction": "Continue chest compressions without stopping. Push hard and fast — 100 to 120 per minute. Do not stop until help arrives.",
              "spoken_text": "Continue compressions without pause. Push hard and fast. Do not stop until emergency services take over.",
              "next": "cpr_cycle"
            },
            {
              "id": "cpr_cycle",
              "step_number": 7,
              "instruction": "Continue the cycle of 30 compressions (and 2 breaths if performing rescue breathing). Do not stop for more than 10 seconds for any reason.",
              "spoken_text": "Keep going. 30 compressions, 2 breaths if you can. Do not stop for more than 10 seconds. You are keeping this person alive.",
              "branch": {
                "question": "Has an AED (defibrillator) arrived or have emergency services taken over?",
                "yes_path": "cpr_aed",
                "no_path": "cpr_cycle"
              }
            },
            {
              "id": "cpr_aed",
              "step_number": 8,
              "instruction": "If an AED is available: turn it on. Follow the voice prompts exactly. Attach the pads as shown. Do not touch the person when it analyses or shocks.",
              "spoken_text": "Turn on the AED. Follow its voice instructions exactly. Attach the pads as shown in the diagram. Do not touch the person while it analyses. Stand clear when it shocks.",
              "next": "cpr_9"
            },
            {
              "id": "cpr_9",
              "step_number": 9,
              "instruction": "After each AED shock, immediately resume CPR for 2 minutes. Then let the AED re-analyse.",
              "spoken_text": "After each shock, immediately go back to CPR for 2 minutes. Then let the AED analyse again.",
              "next": "cpr_10"
            },
            {
              "id": "cpr_10",
              "step_number": 10,
              "instruction": "Continue until: the person shows signs of life (breathing, moving, coughing), emergency services arrive, or you are physically unable to continue.",
              "spoken_text": "Keep going until the person starts breathing or moving, until emergency services arrive, or until you physically cannot continue. You are doing everything right.",
              "is_terminal": true
            }
          ]
        },

        "child_cpr": {
          "id": "child_cpr",
          "label": "Child CPR (Age 1–8)",
          "description": "Modified CPR protocol for children",
          "steps": [
            {
              "id": "ccpr_1",
              "step_number": 1,
              "instruction": "Call 112/911. If alone with no phone, perform 1 minute of CPR FIRST then call.",
              "spoken_text": "Call 112 or 911. If you are completely alone and have no phone nearby, do 1 minute of CPR first, then go call.",
              "next": "ccpr_2",
              "priority": "critical"
            },
            {
              "id": "ccpr_2",
              "step_number": 2,
              "instruction": "Give 5 initial rescue breaths before starting compressions — tilt head back, lift chin, seal lips, give gentle puffs. Watch for chest rise.",
              "spoken_text": "Start with 5 rescue breaths. Tilt the head back, lift the chin, seal your mouth over theirs, and give 5 gentle puffs. Watch for the chest to rise.",
              "next": "ccpr_3"
            },
            {
              "id": "ccpr_3",
              "step_number": 3,
              "instruction": "Place the heel of ONE hand on the centre of the chest. For small children, use 2 fingers only.",
              "spoken_text": "Place the heel of one hand on the centre of the chest. For very small children, use just 2 fingers.",
              "next": "ccpr_4"
            },
            {
              "id": "ccpr_4",
              "step_number": 4,
              "instruction": "Compress the chest by about one third of its depth — approximately 5cm. Give 30 compressions at 100–120 per minute.",
              "spoken_text": "Push the chest down by about one third — roughly 5 centimetres. Do 30 compressions fast.",
              "next": "ccpr_5"
            },
            {
              "id": "ccpr_5",
              "step_number": 5,
              "instruction": "Give 2 rescue breaths. Then repeat 30 compressions. Continue this 30:2 ratio without stopping.",
              "spoken_text": "Give 2 rescue breaths. Then 30 compressions again. Keep going — 30 compressions, 2 breaths, 30 compressions, 2 breaths.",
              "next": "ccpr_6"
            },
            {
              "id": "ccpr_6",
              "step_number": 6,
              "instruction": "Continue until the child breathes, moves, or emergency services arrive.",
              "spoken_text": "Keep going until the child starts breathing, until they move, or until help arrives. You are doing the right thing.",
              "is_terminal": true
            }
          ]
        },

        "infant_cpr": {
          "id": "infant_cpr",
          "label": "Infant CPR (Under 1 Year)",
          "description": "Modified CPR protocol for infants",
          "steps": [
            {
              "id": "icpr_1",
              "step_number": 1,
              "instruction": "Call 112/911. If alone, do 1 minute of CPR first then call.",
              "spoken_text": "Call 112 or 911 immediately. If you are alone, do 1 minute of CPR first.",
              "next": "icpr_2",
              "priority": "critical"
            },
            {
              "id": "icpr_2",
              "step_number": 2,
              "instruction": "Give 5 gentle rescue breaths. Cover both the mouth and nose with your mouth for an infant. Give small gentle puffs — just enough to see the chest rise.",
              "spoken_text": "Give 5 gentle rescue breaths. Cover both the nose and mouth with your mouth. Give tiny gentle puffs — just enough to see the chest lift.",
              "next": "icpr_3"
            },
            {
              "id": "icpr_3",
              "step_number": 3,
              "instruction": "Place 2 fingers on the centre of the chest — just below the nipple line. Press down about 4cm (1.5 inches). Release fully.",
              "spoken_text": "Place 2 fingers on the centre of the chest just below the nipple line. Press down about 4 centimetres. Release completely each time.",
              "next": "icpr_4"
            },
            {
              "id": "icpr_4",
              "step_number": 4,
              "instruction": "Give 30 compressions at 100–120 per minute, then 2 gentle rescue breaths. Repeat this cycle continuously.",
              "spoken_text": "Give 30 fast compressions, then 2 gentle rescue breaths. Keep repeating this cycle without stopping.",
              "next": "icpr_5"
            },
            {
              "id": "icpr_5",
              "step_number": 5,
              "instruction": "Continue until the infant breathes, moves, or emergency services arrive.",
              "spoken_text": "Keep going until the baby breathes or moves, or until emergency services take over.",
              "is_terminal": true
            }
          ]
        }
      }
    }
  },

  "shared_knowledge": {
    "emergency_numbers": {
      "india": "112",
      "international": "911 or 112",
      "ambulance_india": "108"
    },
    "shock_signs": [
      "Pale, cold, clammy skin",
      "Rapid weak pulse",
      "Rapid shallow breathing",
      "Dizziness or fainting",
      "Nausea or vomiting",
      "Confusion or anxiety"
    ],
    "shock_treatment": "Lay flat, raise legs 30cm if no spinal injury, keep warm, do not give food or water, call emergency services",
    "do_not_do": [
      "Do not move a person with suspected spinal injury",
      "Do not give food or water to unconscious or seriously injured person",
      "Do not remove embedded objects from wounds",
      "Do not apply a tourniquet unless trained",
      "Do not do blind finger sweeps in choking",
      "Do not use abdominal thrusts on infants or pregnant women"
    ],
    "reassurance_phrases": [
      "You are doing the right thing.",
      "Help is on the way.",
      "Stay calm — you are helping this person.",
      "You are doing well. Keep going.",
      "Take a breath. You've got this."
    ]
  }
}
// Universal export — works in Node.js and browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = data;
  module.exports.default = data;
}
if (typeof window !== 'undefined') {
  window.emergencyData = data;
}


