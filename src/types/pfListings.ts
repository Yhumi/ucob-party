import war from "../assets/jobs/war.png";
import pld from "../assets/jobs/pld.png";
import drk from "../assets/jobs/drk.png";
import gnb from "../assets/jobs/gnb.png";

import whm from "../assets/jobs/whm.png";
import sch from "../assets/jobs/sch.png";
import ast from "../assets/jobs/ast.png";
import sge from "../assets/jobs/sge.png";

import mnk from "../assets/jobs/mnk.png";
import drg from "../assets/jobs/drg.png";
import nin from "../assets/jobs/nin.png";
import sam from "../assets/jobs/sam.png";
import rpr from "../assets/jobs/rpr.png";

import brd from "../assets/jobs/brd.png";
import mch from "../assets/jobs/mch.png";
import dnc from "../assets/jobs/dnc.png";

import blm from "../assets/jobs/blm.png";
import smn from "../assets/jobs/smn.png";
import rdm from "../assets/jobs/rdm.png";
import blu from "../assets/jobs/blu.png";

import acn from "../assets/jobs/acn.png";
import arc from "../assets/jobs/arc.png";
import cnj from "../assets/jobs/cnj.png";
import lnc from "../assets/jobs/lnc.png";
import pgl from "../assets/jobs/pgl.png";
import rog from "../assets/jobs/rog.png";
import thm from "../assets/jobs/thm.png";

import crp from "../assets/jobs/crp.png";
import bsm from "../assets/jobs/bsm.png";
import arm from "../assets/jobs/arm.png";
import gsm from "../assets/jobs/gsm.png";
import ltW from "../assets/jobs/ltW.png";
import wvr from "../assets/jobs/wvr.png";
import alc from "../assets/jobs/alc.png";
import cul from "../assets/jobs/cul.png";

import min from "../assets/jobs/min.png";
import btn from "../assets/jobs/btn.png";
import fsh from "../assets/jobs/fsh.png";

export type PageResponse<T> = {
  data : T[];
}

export type PFListing = {
  datacenter: string;
  duty: string;
  tags: string;
  description: string;
  creator: string;
  world: string;
  expires: string;
  updated: string;
  party: PartySlot[];
}

export type PartySlot = {
  Roles: PartySlotRoles;
  Job: number;
  Filled: boolean;
}

export type PartySlotRoles = {
  Roles: number[];
}

export enum Role {
  Any = 0,
  Tank = 1,
  Healer = 2,
  DPS = 3
}

export const JobIcons : Record<number, ImageMetadata> = {
  0: fsh,
  1: gnb,
  2: pld,
  3: drk,
  4: war,
  
  5: sch,
  6: sge,
  7: ast,
  8: whm,

  9: sam,
  10: drg,
  11: nin,
  12: mnk,
  13: rpr,

  14: brd,
  15: mch,
  16: dnc,

  17: blm,
  18: smn,
  19: rdm,
  20: blu
}