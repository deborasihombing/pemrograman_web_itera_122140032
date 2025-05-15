from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import DBAPIError
from ..models import Matakuliah
import json


@view_config(route_name='matakuliah_list', renderer='json', request_method='GET')
def get_matakuliah_list(request):
    items = request.dbsession.query(Matakuliah).all()
    data = [
        {
            'id': i.id,
            'kode_mk': i.kode_mk,
            'nama_mk': i.nama_mk,
            'sks': i.sks,
            'semester': i.semester
        } for i in items
    ]
    return {
        'success': True,
        'matakuliahs': data
    }


@view_config(route_name='matakuliah_list', renderer='json', request_method='POST')
def create_matakuliah(request):
    try:
        data = request.json_body
        item = Matakuliah(
            kode_mk=data['kode_mk'],
            nama_mk=data['nama_mk'],
            sks=data['sks'],
            semester=data['semester']
        )
        request.dbsession.add(item)
        request.dbsession.flush()
        return {
            'success': True,
            'message': 'Matakuliah berhasil ditambahkan.',
            'matakuliah': {
                'id': item.id,
                'kode_mk': item.kode_mk,
                'nama_mk': item.nama_mk,
                'sks': item.sks,
                'semester': item.semester
            }
        }
    except Exception as e:
        return Response(json.dumps({'success': False, 'error': str(e)}), content_type='application/json', status=400)


@view_config(route_name='matakuliah_detail', renderer='json', request_method='GET')
def get_matakuliah(request):
    id = int(request.matchdict['id'])
    item = request.dbsession.query(Matakuliah).get(id)
    if not item:
        return Response(json.dumps({'success': False, 'message': 'Matakuliah tidak ditemukan'}), content_type='application/json', status=404)
    return {
        'success': True,
        'matakuliah': {
            'id': item.id,
            'kode_mk': item.kode_mk,
            'nama_mk': item.nama_mk,
            'sks': item.sks,
            'semester': item.semester
        }
    }


@view_config(route_name='matakuliah_detail', renderer='json', request_method='PUT')
def update_matakuliah(request):
    id = int(request.matchdict['id'])
    item = request.dbsession.query(Matakuliah).get(id)
    if not item:
        return Response(json.dumps({'success': False, 'message': 'Matakuliah tidak ditemukan'}), content_type='application/json', status=404)

    data = request.json_body
    item.kode_mk = data['kode_mk']
    item.nama_mk = data['nama_mk']
    item.sks = data['sks']
    item.semester = data['semester']

    return {
        'success': True,
        'message': f'Matakuliah id {id} berhasil diperbarui.',
        'matakuliah': {
            'id': item.id,
            'kode_mk': item.kode_mk,
            'nama_mk': item.nama_mk,
            'sks': item.sks,
            'semester': item.semester
        }
    }


@view_config(route_name='matakuliah_detail', renderer='json', request_method='DELETE')
def delete_matakuliah(request):
    id = int(request.matchdict['id'])
    item = request.dbsession.query(Matakuliah).get(id)
    if not item:
        return Response(json.dumps({'success': False, 'message': 'Matakuliah tidak ditemukan'}), content_type='application/json', status=404)

    request.dbsession.delete(item)
    return {
        'success': True,
        'message': f'Matakuliah id {id} berhasil dihapus.'
    }
