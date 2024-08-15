#ifndef __NODE_GDAL_FIELDSUBTYPES_H__
#define __NODE_GDAL_FIELDSUBTYPES_H__

// OFSTNone = 0, OFSTBoolean = 1, OFSTInt16 = 2, OFSTFloat32 = 3, OFSTJSON = 4,
// OFSTUUID = 5

static const char *const FIELD_SUB_TYPES[] = {
  /* 0 */ "none",
  /* 1 */ "boolean",
  /* 2 */ "integer",
  /* 3 */ "real",
  /* 4 */ "json",
  /* 5 */ "uuid"};

inline const char *getFieldSubTypeName(OGRFieldSubType subType) {
  int i = static_cast<int>(subType);
  if (i < 0 || i > OFSTMaxSubType) { return "invalid"; }
  return FIELD_SUB_TYPES[i];
}

inline int getFieldSubTypeByName(std::string name) {
  for (int i = 0; i <= OFSTMaxSubType; i++) {
    if (name == FIELD_SUB_TYPES[i]) return i;
  }
  return -1;
}

#endif
