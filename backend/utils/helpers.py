import json
from bson import ObjectId

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

def serialize_doc(doc):
    """Convert MongoDB document ObjectId to string for JSON serialization"""
    if not doc:
        return None
    if '_id' in doc:
        doc['_id'] = str(doc['_id'])
    # Optional: convert other ObjectId fields if necessary
    for key, value in doc.items():
        if isinstance(value, ObjectId):
            doc[key] = str(value)
    return doc

def serialize_docs(docs):
    """Serialize a list of MongoDB documents"""
    return [serialize_doc(doc) for doc in docs]
